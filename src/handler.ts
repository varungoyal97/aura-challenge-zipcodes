import { APIGatewayProxyHandler } from "aws-lambda";
import { Details } from "./model/Details";
import { getAllDataFrom } from "./service/FetchingService";
import { JsonModel } from "./model/JsonModel";
import Fuse from "fuse.js";

import _ from "lodash";
import { prepResponse } from "./util/Utils";

function filter(value: string, match: string) {
  if (!match) {
    return false;
  }
  return value?.toLowerCase().localeCompare(match.toLowerCase()) === 0;
}

function findByLongitudeLatitude(
  data: JsonModel[],
  details: Details,
  skip: boolean
) {
  if (!details.latitude && !details.longitude) {
    if (skip) {
      throw new Error(
        `Not a valid search for details : ${JSON.stringify(details)}`
      );
    }
    return data;
  }
  if (data.length === 0) {
    return [];
  }
  let findByLongitudeLatitude = data.find(
    d =>
      filter(d.longitude!, details.longitude!) &&
      filter(d.latitude!, details.latitude!)
  );
  if (findByLongitudeLatitude) {
    console.info(
      `Successfully found an exact match with locale for details : ${JSON.stringify(
        details
      )}`
    );
    return [findByLongitudeLatitude];
  }
  let jsonModelByLatitude = details.latitude
    ? data.reduce((prev, curr) => {
        return findDiff(curr.latitude, details.latitude) <
          findDiff(prev.latitude, details.latitude)
          ? curr
          : prev;
      })
    : JsonModel.EMPTY_JSON_MODEL;
  let jsonModelByLongitude = details.longitude
    ? data.reduce((prev, curr) => {
        return findDiff(curr.longitude, details.longitude) <
          findDiff(prev.longitude, details.longitude)
          ? curr
          : prev;
      })
    : JsonModel.EMPTY_JSON_MODEL;
  let dataToReturn: JsonModel[] = [];
  if (_.isEqual(jsonModelByLatitude, jsonModelByLongitude)) {
    dataToReturn.push(jsonModelByLongitude);
  } else {
    dataToReturn.push(...[jsonModelByLongitude, jsonModelByLatitude]);
  }
  return dataToReturn.filter(
    json => !_.isEqual(json, JsonModel.EMPTY_JSON_MODEL)
  );
}

function findDiff(value1: string, value2: string) {
  let number1 = parseFloat(value1);
  let number2 = parseFloat(value2);
  if (!isNaN(number1) && !isNaN(number2)) {
    return Math.abs(number1 - number2);
  }
  return Number.MAX_SAFE_INTEGER;
}

function getByOtherDetails(details: Details) {
  let updatedData: JsonModel[] = [];
  let filtered = false;
  if (details.city) {
    updatedData = data.filter(json => verifyByCityName(json, details.city));
    filtered = true;
  }
  if (details.country) {
    if (filtered) {
      updatedData = updatedData.filter(model =>
        filter(model.country!, details.country!)
      );
    } else {
      updatedData = data.filter(model =>
        filter(model.country!, details.country!)
      );
      filtered = true;
    }
  }
  if (details.state) {
    if (filtered) {
      updatedData = updatedData.filter(model =>
        filter(model.state!, details.state!)
      );
    } else {
      updatedData = data.filter(model => filter(model.state!, details.state!));
      filtered = true;
    }
  }
  if (!filtered) {
    console.warn(
      `Not able to find by basic details for details : ${JSON.stringify(
        details
      )}`
    );
    return findByLongitudeLatitude(data, details, true);
  }
  console.info(
    `Verified by basic details, confirming with longitude/latitude for details : ${JSON.stringify(
      details
    )}`
  );
  return findByLongitudeLatitude(updatedData, details, false);
}

function verifyByCityName(jsonModel: JsonModel, city: string) {
  if (filter(jsonModel.primary_city?.toLowerCase(), city)) {
    return true;
  }
  if (jsonModel.acceptable_cities && jsonModel.unacceptable_cities) {
    return (
      jsonModel.acceptable_cities
        .split(",")
        .map(city => city.toLowerCase())
        .includes(city?.toLowerCase()) ||
      !jsonModel.unacceptable_cities
        .split(",")
        .map(city => city.toLowerCase())
        .includes(city?.toLowerCase())
    );
  } else if (jsonModel.acceptable_cities) {
    return jsonModel.acceptable_cities
      .split(",")
      .map(city => city.toLowerCase())
      .includes(city?.toLowerCase());
  } else if (jsonModel.unacceptable_cities) {
    return !jsonModel.unacceptable_cities
      .split(",")
      .map(city => city.toLowerCase())
      .includes(city?.toLowerCase());
  }
  return false;
}

function getEntryFrom(details: Details) {
  let findByZipCode = data.find(
    model => model.zip?.localeCompare(details?.zipcode) === 0
  );
  if (!findByZipCode) {
    console.warn(`No unique data found by zip code : ${details?.zipcode}`);
    return getByOtherDetails(details);
  }
  return [findByZipCode];
}

const data = getAllDataFrom("resources/data.json");
export const handler: APIGatewayProxyHandler = async (event): Promise<any> => {
  if (!event || !event.body) {
    console.error("Invalid request.");
    throw new Error("Invalid request");
  }
  const details: Details = JSON.parse(event.body);
  if (details.partialSearch) {
    return prepResponse(200, fuzzySearch(details));
  }
  return prepResponse(200, getEntryFrom(details));
};

function fuzzySearch(details: Details) {
  const fuse = new Fuse(data, {
    keys: [
      { name: "zip", weight: 1 },
      { name: "primary_city", weight: 1 },
      { name: "country", weight: 1 }
    ],
    minMatchCharLength: 4
  });
  let searchByZip: any[] = [];
  let searchByCity: any[] = [];
  let searchByCountry: any[] = [];
  if (details.zipcode) {
    searchByZip = fuse.search(details.zipcode);
  }
  if (details.city) {
    searchByCity = fuse.search(details.city);
  }
  if (details.country) {
    searchByCountry = fuse.search(details.country);
  }
  const findByFuzzySearch = [
    ...new Set<JsonModel>([...searchByZip, ...searchByCountry, ...searchByCity])
  ];
  if (findByFuzzySearch.length === 0) {
    throw new Error(
      `Not a valid search statement for details : ${JSON.stringify(details)}`
    );
  }
  return findByFuzzySearch;
}

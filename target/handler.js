"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FetchingService_1 = require("./service/FetchingService");
const JsonModel_1 = require("./model/JsonModel");
const fuse_js_1 = __importDefault(require("fuse.js"));
const lodash_1 = __importDefault(require("lodash"));
function filter(value, match) {
    if (!match) {
        return false;
    }
    return (value === null || value === void 0 ? void 0 : value.toLowerCase().localeCompare(match.toLowerCase())) === 0;
}
function findByLongitudeLatitude(data, details, skip) {
    if (!details.latitude && !details.longitude) {
        if (skip) {
            throw new Error(`Not a valid search for details : ${details}`);
        }
        return data;
    }
    let findByLongitudeLatitude = data.find(d => filter(d.longitude, details.longitude) &&
        filter(d.latitude, details.latitude));
    if (findByLongitudeLatitude) {
        console.info(`Successfully found an exact match with locale for details : ${JSON.stringify(details)}`);
        return [findByLongitudeLatitude];
    }
    let jsonModelByLatitude = details.latitude ? data.reduce((prev, curr) => {
        return findDiff(curr.latitude, details.latitude) <
            findDiff(prev.latitude, details.latitude)
            ? curr
            : prev;
    }) : JsonModel_1.JsonModel.EMPTY_JSON_MODEL;
    let jsonModelByLongitude = details.longitude ? data.reduce((prev, curr) => {
        return findDiff(curr.longitude, details.longitude) <
            findDiff(prev.longitude, details.longitude)
            ? curr
            : prev;
    }) : JsonModel_1.JsonModel.EMPTY_JSON_MODEL;
    let dataToReturn = [];
    if (lodash_1.default.isEqual(jsonModelByLatitude, jsonModelByLongitude)) {
        dataToReturn.push(jsonModelByLongitude);
    }
    else {
        dataToReturn.push(...[jsonModelByLongitude, jsonModelByLatitude]);
    }
    return dataToReturn.filter(json => !lodash_1.default.isEqual(json, JsonModel_1.JsonModel.EMPTY_JSON_MODEL));
}
function findDiff(value1, value2) {
    let number1 = parseFloat(value1);
    let number2 = parseFloat(value2);
    if (!isNaN(number1) && !isNaN(number2)) {
        return Math.abs(number1 - number2);
    }
    return Number.MAX_SAFE_INTEGER;
}
function getByOtherDetails(details) {
    let updatedData = [];
    let filtered = false;
    if (details.city) {
        updatedData = data.filter(json => verifyByCityName(json, details.city));
        filtered = true;
    }
    if (details.country) {
        if (filtered) {
            updatedData = updatedData.filter(model => filter(model.country, details.country));
        }
        else {
            updatedData = data.filter(model => filter(model.country, details.country));
            filtered = true;
        }
    }
    if (details.state) {
        if (filtered) {
            updatedData = updatedData.filter(model => filter(model.state, details.state));
        }
        else {
            updatedData = data.filter(model => filter(model.state, details.state));
            filtered = true;
        }
    }
    if (!filtered) {
        console.warn(`Not able to find by basic details for details : ${JSON.stringify(details)}`);
        return findByLongitudeLatitude(data, details, true);
    }
    console.info(`Verified by basic details, confirming with longitude/latitude for details : ${JSON.stringify(details)}`);
    return findByLongitudeLatitude(updatedData, details, false);
}
function verifyByCityName(jsonModel, city) {
    var _a;
    if (filter((_a = jsonModel.primary_city) === null || _a === void 0 ? void 0 : _a.toLowerCase(), city)) {
        return true;
    }
    if (jsonModel.acceptable_cities && jsonModel.unacceptable_cities) {
        return jsonModel.acceptable_cities.split(",")
            .map(city => city.toLowerCase())
            .includes(city === null || city === void 0 ? void 0 : city.toLowerCase()) ||
            !jsonModel.unacceptable_cities.split(",")
                .map(city => city.toLowerCase())
                .includes(city === null || city === void 0 ? void 0 : city.toLowerCase());
    }
    else if (jsonModel.acceptable_cities) {
        return jsonModel.acceptable_cities.split(",")
            .map(city => city.toLowerCase())
            .includes(city === null || city === void 0 ? void 0 : city.toLowerCase());
    }
    else if (jsonModel.unacceptable_cities) {
        return !jsonModel.unacceptable_cities.split(",")
            .map(city => city.toLowerCase())
            .includes(city === null || city === void 0 ? void 0 : city.toLowerCase());
    }
    return false;
}
function getEntryFrom(details) {
    let findByZipCode = data.find(model => { var _a; return ((_a = model.zip) === null || _a === void 0 ? void 0 : _a.localeCompare(details === null || details === void 0 ? void 0 : details.zipcode)) === 0; });
    if (!findByZipCode) {
        console.warn(`No unique data found by zip code : ${details === null || details === void 0 ? void 0 : details.zipcode}`);
        return getByOtherDetails(details);
    }
    return [findByZipCode];
}
const data = FetchingService_1.getAllDataFrom("resources/data.json");
exports.handler = async (event) => {
    if (!event || !event.body) {
        console.error("Invalid request.");
        throw new Error("Invalid request");
    }
    const details = JSON.parse(event.body);
    if (details.partialSearch) {
        return fuzzySearch(details);
    }
    return getEntryFrom(details);
};
function fuzzySearch(details) {
    const fuse = new fuse_js_1.default(data, {
        keys: [{ name: "zip", weight: 1 }, { name: "primary_city", weight: 1 }, { name: "country", weight: 1 }],
        minMatchCharLength: 4
    });
    let searchByZip = [];
    let searchByCity = [];
    let searchByCountry = [];
    if (details.zipcode) {
        searchByZip = fuse.search(details.zipcode);
    }
    if (details.city) {
        searchByCity = fuse.search(details.city);
    }
    if (details.country) {
        searchByCountry = fuse.search(details.country);
    }
    const findByFuzzySearch = [...new Set([...searchByZip, ...searchByCountry, ...searchByCity])];
    if (findByFuzzySearch.length === 0) {
        throw new Error(`Not a valid search statement for details : ${JSON.stringify(details)}`);
    }
    return findByFuzzySearch;
}

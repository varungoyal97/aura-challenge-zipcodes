"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonModel = void 0;
class JsonModel {
    constructor(zip, type, primary_city, acceptable_cities, unacceptable_cities, state, county, timezone, area_codes, latitude, longitude, country, estimated_population) {
        this._zip = zip;
        this._type = type;
        this._primary_city = primary_city;
        this._acceptable_cities = acceptable_cities;
        this._unacceptable_cities = unacceptable_cities;
        this._state = state;
        this._county = county;
        this._timezone = timezone;
        this._area_codes = area_codes;
        this._latitude = latitude;
        this._longitude = longitude;
        this._country = country;
        this._estimated_population = estimated_population;
    }
    get zip() {
        return this._zip;
    }
    set zip(value) {
        this._zip = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get primary_city() {
        return this._primary_city;
    }
    set primary_city(value) {
        this._primary_city = value;
    }
    get acceptable_cities() {
        return this._acceptable_cities;
    }
    set acceptable_cities(value) {
        this._acceptable_cities = value;
    }
    get unacceptable_cities() {
        return this._unacceptable_cities;
    }
    set unacceptable_cities(value) {
        this._unacceptable_cities = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get county() {
        return this._county;
    }
    set county(value) {
        this._county = value;
    }
    get timezone() {
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value;
    }
    get area_codes() {
        return this._area_codes;
    }
    set area_codes(value) {
        this._area_codes = value;
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        this._latitude = value;
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        this._longitude = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get estimated_population() {
        return this._estimated_population;
    }
    set estimated_population(value) {
        this._estimated_population = value;
    }
}
exports.JsonModel = JsonModel;
JsonModel.EMPTY_JSON_MODEL = new JsonModel("", "", "", "", "", "", "", "", "", "", "", "", "");

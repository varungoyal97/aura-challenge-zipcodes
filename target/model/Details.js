"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = void 0;
class Details {
    constructor(zipcode, city, state, country, latitude, longitude, areaCode, partialSearch) {
        this._zipcode = zipcode;
        this._city = city;
        this._state = state;
        this._country = country;
        this._latitude = latitude;
        this._longitude = longitude;
        this._areaCode = areaCode;
        this._partialSearch = partialSearch;
    }
    get zipcode() {
        return this._zipcode;
    }
    set zipcode(value) {
        this._zipcode = value;
    }
    get partialSearch() {
        return this._partialSearch;
    }
    set partialSearch(value) {
        this._partialSearch = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
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
    get areaCode() {
        return this._areaCode;
    }
    set areaCode(value) {
        this._areaCode = value;
    }
}
exports.Details = Details;

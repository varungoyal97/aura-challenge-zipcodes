export class Details {
    constructor(zipcode: string, city: string, state: string, country: string, latitude: string, longitude: string, areaCode: string, partialSearch: boolean) {
        this._zipcode = zipcode;
        this._city = city;
        this._state = state;
        this._country = country;
        this._latitude = latitude;
        this._longitude = longitude;
        this._areaCode = areaCode;
        this._partialSearch = partialSearch;
    }

    private _zipcode: string;

    get zipcode(): string {
        return this._zipcode;
    }

    set zipcode(value: string) {
        this._zipcode = value;
    }

    private _partialSearch: boolean;

    get partialSearch(): boolean {
        return this._partialSearch;
    }

    set partialSearch(value: boolean) {
        this._partialSearch = value;
    }

    private _city: string;

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    private _state: string;

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    private _country: string;

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    private _latitude: string;

    get latitude(): string {
        return this._latitude;
    }

    set latitude(value: string) {
        this._latitude = value;
    }

    private _longitude: string;

    get longitude(): string {
        return this._longitude;
    }

    set longitude(value: string) {
        this._longitude = value;
    }

    private _areaCode: string;

    get areaCode(): string {
        return this._areaCode;
    }

    set areaCode(value: string) {
        this._areaCode = value;
    }
}
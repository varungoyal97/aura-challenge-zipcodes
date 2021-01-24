export class JsonModel {
    public static EMPTY_JSON_MODEL = new JsonModel("", "", "", "", "", "", "", "", "", "", "", "", "");

    constructor(zip: string, type: string, primary_city: string, acceptable_cities: string | null, unacceptable_cities: string | null, state: string, county: string, timezone: string, area_codes: string, latitude: string, longitude: string, country: string, estimated_population: string) {
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

    private _zip: string;

    get zip(): string {
        return this._zip;
    }

    set zip(value: string) {
        this._zip = value;
    }

    private _type: string;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    private _primary_city: string;

    get primary_city(): string {
        return this._primary_city;
    }

    set primary_city(value: string) {
        this._primary_city = value;
    }

    private _acceptable_cities: string | null;

    get acceptable_cities(): string | null {
        return this._acceptable_cities;
    }

    set acceptable_cities(value: string | null) {
        this._acceptable_cities = value;
    }

    private _unacceptable_cities: string | null;

    get unacceptable_cities(): string | null {
        return this._unacceptable_cities;
    }

    set unacceptable_cities(value: string | null) {
        this._unacceptable_cities = value;
    }

    private _state: string;

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    private _county: string;

    get county(): string {
        return this._county;
    }

    set county(value: string) {
        this._county = value;
    }

    private _timezone: string;

    get timezone(): string {
        return this._timezone;
    }

    set timezone(value: string) {
        this._timezone = value;
    }

    private _area_codes: string;

    get area_codes(): string {
        return this._area_codes;
    }

    set area_codes(value: string) {
        this._area_codes = value;
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

    private _country: string;

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    private _estimated_population: string;

    get estimated_population(): string {
        return this._estimated_population;
    }

    set estimated_population(value: string) {
        this._estimated_population = value;
    }
}
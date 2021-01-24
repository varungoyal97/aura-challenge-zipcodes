import {readFileSync} from "fs";
import {JsonModel} from "../model/JsonModel";

export function getAllDataFrom(fileName: string) {
    let data = readFileSync(fileName, 'utf8');
    let jsonModel: JsonModel[] = JSON.parse(data);
    return jsonModel;
}
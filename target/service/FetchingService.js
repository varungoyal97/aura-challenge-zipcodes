"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDataFrom = void 0;
const fs_1 = require("fs");
function getAllDataFrom(fileName) {
    let data = fs_1.readFileSync(fileName, 'utf8');
    let jsonModel = JSON.parse(data);
    return jsonModel;
}
exports.getAllDataFrom = getAllDataFrom;

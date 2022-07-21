"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plant_1 = require("../models/plant");
const jwt = require("jsonwebtoken");
const store = new plant_1.Plants();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    const plants = yield store.index();
    res.json(plants);
});
const plant_routes = (app) => {
    app.get('/plants', index);
};
exports.default = plant_routes;

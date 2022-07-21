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
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const store = new user_1.Users();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plants = yield store.index();
    res.json(plants);
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.signIn(req.body.name, req.body.password);
    if (user !== null) {
        let token = jwt.sign({ User: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    else {
        res.json(user);
    }
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.signUp(req.body.name, req.body.password);
    let token = jwt.sign({ User: user }, process.env.TOKEN_SECRET);
    res.json(token);
});
const user_routes = (app) => {
    app.get('/users', index);
    app.post('/users/signup', signUp);
    app.post('/users/signin', signIn);
};
exports.default = user_routes;

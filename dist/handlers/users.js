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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.Users();
const TOKEN_SECRET = process.env.TOKEN_SECRET + "";
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.login(req.body.username, req.body.password);
    if (user !== null) {
        const token = jsonwebtoken_1.default.sign({ User: user }, TOKEN_SECRET);
        res.json(token);
    }
    else {
        res.json("username or password is incorrect");
    }
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.create(req.body.username, req.body.firstname, req.body.lastname, req.body.password);
    const token = jsonwebtoken_1.default.sign({ User: user }, TOKEN_SECRET);
    res.json(token);
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.getUser(req.params.username);
    if (user === undefined) {
        res.json("no such user exists");
        return;
    }
    res.json(user);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.updateOne(req.body.firstname, req.body.lastname, req.body.password, req.body.username);
    res.json(result);
});
const user_routes = (app) => {
    app.get('/users', authorize_1.default, index);
    app.get('/users/:username', authorize_1.default, getUser);
    app.post('/users', signUp);
    app.post('/users/login', login);
    app.put('/users', authorize_1.default, updateUser);
};
exports.default = user_routes;

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
const jwt = require('jsonwebtoken');
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = '' + req.headers.authorization;
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Acess denied, invalid token");
        return;
    }
    next();
});
exports.default = authorization;

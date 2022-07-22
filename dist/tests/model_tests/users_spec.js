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
const users_1 = require("../../models/users");
const database_1 = __importDefault(require("../../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = require('bcrypt');
const store = new users_1.Users();
let user;
describe('Users model ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO users (userName,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETURNING *';
        const salt_rounds = '' + process.env.SALT_ROUNDS;
        const hash = bcrypt.hashSync("password123" + process.env.PEPPER, parseInt(salt_rounds));
        const result = yield conn.query(sql, ["shehabgad", "shehab", "gad", hash]);
        user = result.rows[0];
        conn.release();
    }));
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a getUser method", () => {
        expect(store.getUser).toBeDefined();
    });
    it("should have an create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have an updateOne method", () => {
        expect(store.updateOne).toBeDefined();
    });
    it("should have a login method", () => {
        expect(store.login).toBeDefined();
    });
    it("index method should return a list of all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            user
        ]);
    }));
    it("get method should return a user with the provided username", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.getUser("shehabgad");
        expect(result).toEqual(user);
    }));
    it("create method should create a new user and return the data of the created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create("tarekgad", "tarek", "gad", "password321");
        expect(result).toBeDefined();
    }));
    it("update method should update user with a certain username and return the updated data of the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.updateOne("mohamed", "ahmed", "56533711", "shehabgad");
        expect(result).toBeDefined();
    }));
    it("login method should return a user provided the username and password", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.login("shehabgad", "56533711");
        expect(result).not.toBeNull();
    }));
});

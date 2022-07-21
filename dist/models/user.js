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
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = require('bcrypt');
const { BCRYPT_PASSWORD, SALT_ROUNDS, PEPPER } = process.env;
class Users {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get users ${err}`);
            }
        });
    }
    signUp(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (name,password_digest) VALUES ($1,$2) RETURNING *";
                const salt_rounds = "" + SALT_ROUNDS;
                const hash = bcrypt.hashSync(password + PEPPER, parseInt(salt_rounds));
                const result = yield conn.query(sql, [name, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot create user ${err}`);
            }
        });
    }
    signIn(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT * from users WHERE name = $1";
            const result = yield conn.query(sql, [name]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
                    return user;
                }
            }
            conn.release();
            return null;
        });
    }
}
exports.Users = Users;

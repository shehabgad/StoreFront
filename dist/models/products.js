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
exports.Products = void 0;
const database_1 = __importDefault(require("../database"));
class Products {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get products ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products WHERE id = ${id};`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot get product ${err}`);
            }
        });
    }
    create(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
                const result = yield conn.query(sql, [name, price]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot create product ${err}`);
            }
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE products SET name =($1), price =($2) WHERE id = ($3) RETURNING *';
                const result = yield conn.query(sql, [
                    product.name,
                    product.price,
                    product.id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('cannot update product');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM products WHERE id = ${id} RETURNING *`;
                const result = yield conn.query(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error('cannot delete product');
            }
        });
    }
}
exports.Products = Products;

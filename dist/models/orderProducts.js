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
exports.OrderProducts = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProducts {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orderProducts;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get order_products ${err}`);
            }
        });
    }
    show(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orderProducts WHERE order_id = '${order_id}'`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get order_product ${err}`);
            }
        });
    }
    create(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orderProducts (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
                const result = yield conn.query(sql, [order_id, product_id, quantity]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot create order_product ${err}`);
            }
        });
    }
    update(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orderProducts SET quantity =($1) WHERE order_id = ($2) AND product_id = ($3) RETURNING *';
                const result = yield conn.query(sql, [quantity, order_id, product_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('cannot update order_product');
            }
        });
    }
    delete(order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM orderProducts WHERE order_id = ${order_id} AND product_id = ${product_id} RETURNING *`;
                const result = yield conn.query(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot delete order_product ${err}`);
            }
        });
    }
}
exports.OrderProducts = OrderProducts;

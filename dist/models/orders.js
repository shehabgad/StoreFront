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
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
const orderProducts_1 = require("./orderProducts");
const orderProductsStore = new orderProducts_1.OrderProducts();
class Orders {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders;';
                const result = yield conn.query(sql);
                conn.release();
                for (let i = 0; i < result.rows.length; i++) {
                    result.rows[i].orderProducts = yield orderProductsStore.show(result.rows[i].id);
                }
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get orders ${err}`);
            }
        });
    }
    indexByUserID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id = ${id};`;
                const result = yield conn.query(sql);
                conn.release();
                for (let i = 0; i < result.rows.length; i++) {
                    result.rows[i].orderProducts = yield orderProductsStore.show(result.rows[i].id);
                }
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot get orders ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE id = ${id};`;
                const result = yield conn.query(sql);
                conn.release();
                result.rows[0].orderProducts = yield orderProductsStore.show(id);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot get order ${err}`);
            }
        });
    }
    create(user_id, status, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';
                const result = yield conn.query(sql, [status, user_id]);
                conn.release();
                result.rows[0].orderProducts = [];
                for (let i = 0; i < products.length; i++) {
                    const orderProduct = yield orderProductsStore.create(result.rows[0].id, products[i].id, products[i].quantity);
                    result.rows[0].orderProducts.push(orderProduct);
                }
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot create order ${err}`);
            }
        });
    }
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE orders SET status = ($1) WHERE id = ($2) RETURNING *";
                const result = yield conn.query(sql, [status, id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error("cannot update order");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
                const result = yield conn.query(sql);
                return result.rows[0];
            }
            catch (err) {
                throw new Error("cannot delete order");
            }
        });
    }
}
exports.Orders = Orders;

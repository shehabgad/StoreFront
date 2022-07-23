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
const orderProducts_1 = require("../../models/orderProducts");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const productStore = new products_1.Products();
const usersStore = new users_1.Users();
const orderProductsStore = new orderProducts_1.OrderProducts();
describe('OrderProducts model ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            usersStore.create('shehabgad', 'shehab', 'gad', 'password123');
            productStore.create('product1', 50);
            productStore.create('product2', 60);
            productStore.create('product3', 60);
            const products = [
                { id: 1, quantity: 2 },
                { id: 2, quantity: 1 },
            ];
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';
            const result = yield conn.query(sql, ['active', 1]);
            conn.release();
            result.rows[0].orderProducts = [];
            for (let i = 0; i < products.length; i++) {
                const orderProduct = yield orderProductsStore.create(result.rows[0].id, products[i].id, products[i].quantity);
                result.rows[0].orderProducts.push(orderProduct);
            }
        }
        catch (eror) {
            throw new Error(`error : ${eror}`);
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            let sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
            yield conn.query(sql);
            sql =
                'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
            yield conn.query(sql);
            sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
            yield conn.query(sql);
            conn.release();
        }
        catch (err) {
            throw new Error(err + '');
        }
    }));
    it('should have an index method', () => {
        expect(orderProductsStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderProductsStore.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(orderProductsStore.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(orderProductsStore.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(orderProductsStore.delete).toBeDefined();
    });
    it('index method should return a list of all orderProducts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderProductsStore.index();
        expect(result).toEqual([
            {
                order_id: 1,
                product_id: 1,
                quantity: 2,
            },
            {
                order_id: 1,
                product_id: 2,
                quantity: 1,
            },
        ]);
    }));
    it('show method should return orderProducts with the provided order id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderProductsStore.show(1);
        expect(result).toEqual([
            {
                order_id: 1,
                product_id: 1,
                quantity: 2,
            },
            {
                order_id: 1,
                product_id: 2,
                quantity: 1,
            },
        ]);
    }));
    it('create method should create an orderProduct and return its details', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderProductsStore.create(1, 3, 40);
        expect(result.quantity).toEqual(40);
    }));
    it('update method should should update orderProduct', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderProductsStore.update(1, 1, 1);
        expect(result.quantity).toEqual(1);
    }));
    it('delete method should delete orderProduct', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderProductsStore.delete(1, 1);
        expect(result.order_id).toEqual(1);
    }));
});

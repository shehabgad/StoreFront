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
const orders_1 = require("../../models/orders");
const orderProducts_1 = require("../../models/orderProducts");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const ordersStore = new orders_1.Orders();
const productStore = new products_1.Products();
const usersStore = new users_1.Users();
const orderProductsStore = new orderProducts_1.OrderProducts();
describe('Orders model ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            usersStore.create("shehabgad", "shehab", "gad", "password123");
            productStore.create("product1", 50);
            productStore.create("product2", 60);
            const products = [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }];
            const conn = yield database_1.default.connect();
            const sql = 'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *';
            const result = yield conn.query(sql, ["active", 1]);
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
            let sql = "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
            yield conn.query(sql);
            sql = "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;";
            yield conn.query(sql);
            sql = "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;";
            yield conn.query(sql);
            conn.release();
        }
        catch (err) {
            throw new Error(err + "");
        }
    }));
    it("should have an index method", () => {
        expect(ordersStore.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(ordersStore.show).toBeDefined();
    });
    it("should have an create method", () => {
        expect(ordersStore.create).toBeDefined();
    });
    it("should have an update method", () => {
        expect(ordersStore.update).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(ordersStore.delete).toBeDefined();
    });
    it("should have a indexByUserID method", () => {
        expect(ordersStore.indexByUserID).toBeDefined();
    });
    it("index method should return a list of all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ordersStore.index();
        expect(result).toEqual([
            {
                id: 1,
                status: "active",
                user_id: 1,
                orderProducts: [
                    {
                        order_id: 1,
                        product_id: 1,
                        quantity: 2
                    },
                    {
                        order_id: 1,
                        product_id: 2,
                        quantity: 1
                    }
                ]
            }
        ]);
    }));
    it("show method should return order details with the provided order id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ordersStore.show(1);
        expect(result).toEqual({
            id: 1,
            status: "active",
            user_id: 1,
            orderProducts: [
                {
                    order_id: 1,
                    product_id: 1,
                    quantity: 2
                },
                {
                    order_id: 1,
                    product_id: 2,
                    quantity: 1
                }
            ]
        });
    }));
    it("create method should create an order and return its details", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = [{ id: 1, quantity: 5 }];
        const result = yield ordersStore.create(1, "active", products);
        expect(result).toEqual({
            id: 2,
            status: "active",
            user_id: 1,
            orderProducts: [
                {
                    order_id: 2,
                    product_id: 1,
                    quantity: 5
                }
            ]
        });
    }));
    it("update method should should update order status", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ordersStore.update(1, "complete");
        expect(result.status).toEqual("complete");
    }));
    it("delete method should should delete order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ordersStore.delete(2);
        expect(result.id).toEqual(2);
    }));
    it("indexByUserID method should return a list of all orders made by this user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ordersStore.indexByUserID(1);
        expect(result).toEqual([
            {
                id: 1,
                status: "complete",
                user_id: 1,
                orderProducts: [
                    {
                        order_id: 1,
                        product_id: 1,
                        quantity: 2
                    },
                    {
                        order_id: 1,
                        product_id: 2,
                        quantity: 1
                    }
                ]
            }
        ]);
    }));
});

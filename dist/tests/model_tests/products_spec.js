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
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const store = new products_1.Products();
const product = {
    id: 1,
    name: "a nice product",
    price: 50
};
describe('Products model ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
        const result = yield conn.query(sql, ["a nice product", 50]);
        conn.release();
    }));
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have an create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have an update method", () => {
        expect(store.update).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("index method should return a list of all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            product
        ]);
    }));
    it("get method should return a product with the provided id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual(product);
    }));
    it("create method should create a new product and return the data of the created product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create("a nice product 2", 45);
        expect(result).toBeDefined();
    }));
    it("update method should update product with a certain id and return the updated data of the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            id: 2,
            name: "not nice product",
            price: 556
        });
        expect(result).toBeDefined();
    }));
    it("delete method should delete a product provided the id and return the deleted data", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete(1);
        expect(result).toBeDefined();
    }));
});

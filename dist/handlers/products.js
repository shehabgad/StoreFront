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
const products_1 = require("../models/products");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const store = new products_1.Products();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.delete(req.body.id);
    res.json(product);
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.show(parseInt(req.params.id));
    res.json(product);
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.update(req.body.product);
    res.json(result);
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.create(req.body.name, req.body.price);
    res.json(result);
});
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', getProduct);
    app.post('/products', authorize_1.default, createProduct);
    app.put('/products', authorize_1.default, updateProduct);
    app.delete('/products', authorize_1.default, deleteProduct);
};
exports.default = products_routes;

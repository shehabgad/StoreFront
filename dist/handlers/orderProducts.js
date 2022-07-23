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
const orderProducts_1 = require("../models/orderProducts");
const authorize_1 = require("../middlewares/authorize");
const store = new orderProducts_1.OrderProducts();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProducts = yield store.index();
    res.json(orderProducts);
});
const deleteOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProduct = yield store.delete(req.body.order_id, req.body.product_id);
    res.json(orderProduct);
});
const getOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProduct = yield store.show(parseInt(req.params.id));
    res.json(orderProduct);
});
const updateOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.update(req.body.order_id, req.body.product_id, req.body.quantity);
    res.json(result);
});
const createOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.create(req.body.order_id, req.body.product_id, req.body.quantity);
    res.json(result);
});
const orderProducts_routes = (app) => {
    app.get('/orderProducts', authorize_1.authorization, index);
    app.get('/orderProducts/:id', authorize_1.authorization, getOrderProduct);
    app.post('/orderProducts', authorize_1.authorization, createOrderProduct);
    app.put('/orderProducts', authorize_1.authorization, updateOrderProduct);
    app.delete('/orderProducts', authorize_1.authorization, deleteOrderProduct);
};
exports.default = orderProducts_routes;

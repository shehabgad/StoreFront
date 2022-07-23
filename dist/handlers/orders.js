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
const orders_1 = require("../models/orders");
const authorize_1 = require("../middlewares/authorize");
const store = new orders_1.Orders();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
const indexByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.indexByUserID(parseInt(req.params.user_id));
    res.json(orders);
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.delete(req.body.id);
    res.json(order);
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(parseInt(req.params.id));
    res.json(order);
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.update(req.body.id, req.body.status);
    res.json(result);
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.create(req.body.user_id, req.body.status, req.body.products);
    res.json(result);
});
const orders_routes = (app) => {
    app.get('/orders', authorize_1.authorization, index);
    app.get('/orders/:id', authorize_1.authorization, getOrder);
    app.get('/orders/user/:user_id', authorize_1.authorization, indexByUserID);
    app.post('/orders', authorize_1.authorization, createOrder);
    app.put('/orders', authorize_1.authorization, updateOrder);
    app.delete('/orders', authorize_1.authorization, deleteOrder);
};
exports.default = orders_routes;

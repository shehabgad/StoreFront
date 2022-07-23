"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const orderProducts_1 = __importDefault(require("./handlers/orderProducts"));
const cors_1 = __importDefault(require("cors"));
// const cors = require('cors')
exports.app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const corsOptions = {
    origin: 'https://somedomain.com',
    optionSuccessStatus: 200,
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(express_1.default.json());
(0, users_1.default)(exports.app);
(0, products_1.default)(exports.app);
(0, orders_1.default)(exports.app);
(0, orderProducts_1.default)(exports.app);
exports.app.listen(3000, () => {
    console.log(`starting app on : ${address}`);
});

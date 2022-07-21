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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const plant_1 = __importDefault(require("./handlers/plant"));
const user_1 = __importDefault(require("./handlers/user"));
// import cors from 'cors'
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
// const corsOptions = {
//   origin: "https://somedomain.com",
//   optionSuccessStatus: 2S00
// }
// app.use(cors(corsOptions))
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.connect();
    const query = 'SELECT * FROM plants'; // Create a query to select all students
    const results = yield connection.query(query); // Execute the query
    connection.release(); // Release the connection
    res.send(results.rows); // Send the results
}));
(0, plant_1.default)(app);
(0, user_1.default)(app);
app.listen(3000, () => {
    console.log(`starting app on : ${address}`);
});

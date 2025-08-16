"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentRouter_1 = __importDefault(require("./router/studentRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
// middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
//db connect;
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('mongoose connected successfull'))
    .catch((err) => console.log('error from mongoose', err));
// roater setup
app.use('/', studentRouter_1.default);
// server creation
app.listen(Number(PORT), () => {
    console.log(`Server running at localhost:${PORT}`);
});

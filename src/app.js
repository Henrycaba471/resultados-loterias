import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from "body-parser";

const __dirname = path.resolve();

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

import { router } from "./routes/result.routes.js";
app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+ PORT);
});


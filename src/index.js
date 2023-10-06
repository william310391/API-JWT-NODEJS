import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import admin from "./routes/admin.js";
import { middleware } from "./utils/middleware .js";
import { rutas } from "./utils/enum.js";
import { corsConfig } from "./utils/cors.js";
import { businessException } from "./exceptions/businessException.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(corsConfig());

app.use(rutas.auth.base, auth);
app.use(rutas.admin.base, middleware, admin);

app.use((req,res)=>{
    const response = businessException(404,"No se encontro el recurso")
    res.status(404).json(response)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log("Server on port", PORT);


// https://www.linkedin.com/pulse/clean-architecture-en-node-y-express-odannys-de-la-cruz/?originalSubdomain=es
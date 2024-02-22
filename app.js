//plik app.js będący początkiem aplikacji
const express = require('express');
const api = require("./api/api.js");

const app = express();
const PORT = 2137;

app.use(express.json());//jasiek na js

app.use("/api", api)

app.get("/", (req,res)=>{res.send("KrychaGPT");})

app.listen(PORT, () => {console.log("Serwer jest w: Watykanie")});


//pamiętaj hemiku młody
//wpisuj dobry adres strony
//(localhost:2137/api/orzech)
//plik app.js będący początkiem aplikacji
const express = require('express');
const api = require("./api/api.js");
const orzech = require('../orzech/orzech.js');
const app = express();
const PORT = 2137;

app.use(express.json());//jasiek na js

router.get("/orzech", async (req, res) => {
    res.json(orzech.list());
})

router.post("/orzech", async (req,res)=> {
    res.json(orzech.add(req.body));
})

router.put("/orzech/:id", async (req,res)=>{
    req.body.id = parseInt(req.params.id);
    req.json(orzech.update(req));
})
 
router.get("/orzech/:id", async (req, res)=>{
    res.json(orzech.get(req.params.id));
})

router.delete("/orzech/:id", async (req,res)=>{
    res.json(orzech.delete(parseInt(req.params.id)))
})


app.get("/", (req,res)=>{res.send("KrychaGPT");})

app.listen(PORT, () => {console.log("Serwer jest w: Watykanie")});


//pamiętaj hemiku młody
//wpisuj dobry adres strony
//(localhost:2137/api/orzech)
const express = require('express');
const orzech = require('../orzech/orzech.js');
const router = express.Router();

//działa
router.get("/orzech", (req, res) => {
    res.json(orzech.list());
})

//działa
router.post("/orzech", (req,res)=> {
    res.json(orzech.add(req.body));
})

//działa
router.put("/orzech/:id", (req,res)=>{
    req.body.id = parseInt(req.params.id);
    req.json(orzech.update(req.body));
})

//działa
router.get("/orzech/:id", (req, res)=>{
    res.json(orzech.get(req.params.id));
})

//działa
router.delete("/orzech/:id", (req,res)=>{
    res.json(orzech.delete(parseInt(req.params.id)))
})

module.exports = router
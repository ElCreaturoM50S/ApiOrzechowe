import { Router } from 'express'
export const router = Router()
import { czytajBezeDanych,zapiszOrzech,usunOrzech,naprawOrzech,poprawOrzech,czytajOrzech } from './database.mjs'

router.get('/orzech', async (req,res) => {
    const data = await czytajBezeDanych()
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.get('/orzech/:id', async (req,res) => {
    const data = await czytajOrzech(parseInt(req.params.id))
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.post('/orzech', async (req, res) => {
    const newOrzech = req.body
    const data = await zapiszOrzech(newOrzech)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.delete("/orzech/:id", async (req, res) => {
    const data = await usunOrzech(parseInt(req.params.id))
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.put("/orzech/:id", async (req, res) =>{
    const { body } = req
    const data = await naprawOrzech(parseInt(req.params.id), body.name, body.cena)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.patch("/orzech/:id", async (req, res) =>{
    const { body } = req 
    const data = await poprawOrzech(parseInt(req.params.id),body.name, body.cena)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})
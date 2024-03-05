import { Router } from 'express'
export const router = Router()
import { zapiszOrzech } from './database.mjs'

router.get('/orzech', async (req,res) => {
    const data = await zapiszOrzech()
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.post('/orzech', async (req, res) => {
    const { body } = req
    const data = await zapiszOrzech(body.nazwa, body.cena)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.delete("/orzech", async (req, res) => {
    const { query } = req
    const data = await usunOrzech(query.id)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})

router.patch("/orzech", async (req, res) =>{
    const { body } = req 
    const data = await naprawOrzech(body.id, body.nazwa, body.cena)
    if (data?.error) {
        res.status(400).json(data)
        return
    }
    res.json(data)
})
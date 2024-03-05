// tu mamy connect z bazą
import mongoose from 'mongoose'

const BazaDanych = "orzechy"
const zrodlo = `mongodb://127.0.0.1:27017/${BazaDanych}`
mongoose.connect(zrodlo)
const db = mongoose.connection;

const orzechSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    cena: {type: Number, required: true},
})

const OrzechModel = mongoose.model("Orzechy",orzechSchema, "Siatka")

export { db, OrzechModel } 
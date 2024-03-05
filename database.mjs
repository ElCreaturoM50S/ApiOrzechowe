import { orzech } from './db.mjs'
import { ObjectId } from 'mongoose'

export async function czytajBezeDanych() {
    try {
        return await orzech.find() 
    } catch (err) {
        return { error: err}
    }
}

export async function zapiszOrzech(nazwa, cena) {
    try {
        await orzech.create({ nazwa, cena})
        return { nazwa: nazwa, cena: cena }
    } catch (err) {
        return { error: err}
    }
}

export async function usunOrzech() {
    try {
        const orzechdoZapisania = await orzech.findByIdAndDelete(id)
        return orzechdoZapisania
    } catch (err) {
        return { error: err }
    }
}

export async function naprawOrzech(id, nazwa, cena) {
    try {
        if (nazwa) await orzech.findByIdAndUpdate(id, {nazwa: nazwa})
        if (cena) await orzech.findByIdAndUpdate(id, { cena: cena})
        return await orzech.findOne({ _id: id })
    } catch (err) {
        return { err }
    }
}
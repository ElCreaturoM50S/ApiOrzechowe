import { orzech } from './db.mjs'

export async function czytajBezeDanych() {
    try {
        return await orzech.find() 
    } catch (err) {
        return { error: err}
    }
}

export async function zapiszOrzech(body) {
    try {
        //await orzech.create({ nazwa, cena})
        const newOrzech = new orzech(body)
        await newOrzech.validate()
        await newOrzech.save()

        return {message:"Doc added successfully"}
    } catch (err) {
        return { error: err}
    }
}

export async function usunOrzech(id) {
    try {
        const orzechdoZapisania = await orzech.findOneAndDelete({id: id})
        return {message:"usun orzech yupiiii"}
    } catch (err) {
        return { error: err }
    }
}

export async function naprawOrzech(id, nazwa, cena) {
    //mamy id nazwe i cene i to update robi elegancko
    //ale nie mozna robic update id 
    //tylko nazwy i ceny
    try {
        console.log(id,nazwa,cena)
    const result = await orzech.findOneAndUpdate(
        ({id: id}, {name: nazwa, cena: cena})
    )

    if(result.matchedCount===0){
        return {message:"Doc not found"}
    }

    if(result.modifiedCount===0){
        return {message:"No changes to apply"}
    }
    return result
    } catch (err) {
        return { err }
    }
}

export async function poprawOrzech(id, nazwa, cena) {
    try {
        if (nazwa) await orzech.findOneAndUpdate({id: id}, {name: nazwa})
        if (cena) await orzech.findOneAndUpdate({id: id}, { cena: cena})
        return czytajOrzech(id)
    } catch (err) {
        return { err }
    }
}

export async function czytajOrzech(id) {
    try {
        const tenOrzech = await orzech.findOne({id: id })
        return tenOrzech
    } catch (err) {
        return { err }
    }
}
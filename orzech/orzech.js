//do zapisu plikow json
const fs = require("fs") 
const path = require("path")

//https://softchris.github.io/pages/joi.html#introducing-joi
const joi = require("joi")  

const mongoose = require("mongoose")

//to jest polski program i wszystko ma byc po polsku
const BazaDanych = "orzechy";
const zrodlo = `mongodb://localhost:27017/${BazaDanych}`

mongoose.connect(zrodlo)
const bd = mongoose.connect;

const { error } = require("console");

/*
const Joi = require('joi'); 
const schema = Joi.object().keys({ 
  name: Joi.string().alphanum().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1970).max(2013), 
}); 
const dataToValidate = { 
  name 'chris', 
  birthyear: 1971 
} 
const result = Joi.validate(dataToValidate, schema); 
// result.error == null means valid
*/

const orzechySchema = joi.object().keys({
    id: joi.number().integer().min(1).required(),
    nazwa: joi.string().required(),
    cena: joi.number().min(0).max(2500).required()
});

//const copy = (object) => JSON.parse(JSON.stringify(object));
//const findOrzechById = (id) => orzechy.find((orzechy) => orzechy.id == id)
//const getOrzechy = (id) => copy(findOrzechById(id));
//const listaOrzechow = () => copy(orzechy)


const getNextId = () => {
    let lastOrzech = orzechy[orzechy.length - 1];
    return lastOrzech ? lastOrzech.id + 1 : 1;
}

const save = async () => {
    fs.writeFile(
        path.join(__dirname, "orzech.json"),
        JSON.stringify(orzechy, null, 3),
        (error) => {
            if (!error) console.log("Dane zostały poprawnie zapisane");
            else console.log(`Nie zapisano danych ${error}`);
        }
    )
}

//nowe \/

const listaOrzechow = async () => {
    try {
        const collection = db.collection("Siatka");
        const queryResult = collection.find({});
        const allOrzechy = await queryResult.toArray();
        res.send(allOrzechy);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const getOrzechy = async (orzechId) => {
    try{
        if(isNan(orzechId)){
            return res.status(400).json({message: "Invalid ID format"})
        }
        const document = await collection.findOne({id: orzechId});
        if(!document) {
            res.status(404).json({message: "Document not found"})
        }
        res.json(document)
    } catch(err) {
        console.error(err)
        res.status(500).json({error: "Internal Server Error"})
    }
}

//nowe /\

const addNewOrzech = async (orzechDane) => {
    //validacja danych
    /*
    orzechDane.id = getNextId();
    const result = orzechySchema.validate(orzechDane);

    if (result.error) {
        throw new Error(`zła nowego walidacja orzecha`);
    }

    orzechy.push(orzechDane);
    save();
    return getOrzechy(orzechDane.id);
    */
   try{
    if(!isValidDocument(orzechDane)){
        return res.status(400).json({message:"Invalid document format"})
    }
    const collection = db.collection("Siatka")
    const result = await collection.insertOne(orzechDane)
    if(!result.acknowladge) {
        return res.status(500).json({message:"Failed to add orzech"})
    }
    res.status(201).json({message:"Orzech added successfully"})
   }catch(err){
    console.error(err)
    res.status(500).json({error: "Internal server error"});
   }
}

const aktualizacjaOrzecha = async (orzechDane) => {
    /*
    //validacja danych
    const result = orzechySchema.validate(orzechDane);

    if (result.error) {
        throw new Error(`zła walidacja orzecha`)
    }

    let orzech = findOrzechById(orzechDane.id);
    if(!orzech){
        throw new Error("nie ma takiego orzecha w pliku Jasiek")
    }

    Object.assign(orzech,orzechDane)
    save();
    return getOrzechy(orzech.id);
    */
    try {
        const orzechId = orzechDane.params.id
        if(isNaN(orzechDane.body)){
            return res.status(400).json({message:"Invalid Id format"})
        }

        const orzechBodyUpdate = orzechDane.body
        if(!isValidDocument(orzechBodyUpdate)){
            return res.status(400).json({message: "Invalid document format"})
        }

        const collection = db.collection("Siatka")
        const orzechToUpdate = await collection.replaceOne({id:orzechId},orzechBodyUpdate)
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }

}

const deleteOrzech = async (orzechId) => { 
    /*
    let orzech = findOrzechById(orzechId);
    let index = orzechy.indexOf(orzech)
    orzechy.splice(index, 1);
    console.log(`usunięto orzechy: ${orzech.nazwa}`);
    save()
    console.log("po orzechu");
    return copy(orzech)
    */

    try{
        if(isNaN(orzechId)) {
            return res.status(400).json({message: "Invalid ID format"})
        }

        const collection = db.collection("Siatka")
        const orzechToDelete = await collection.deleteOne({id:orzechId})
        if(orzechToDelete.deletedCount === 0) {
            return res.status(404).json({message: "Document not found"})
        }
        res.json({message: "Udało się skasowac dane"})
    } catch(err){
        console.error(err)
        res.status(404).json({message: "Internal Server Error"})
    }
} 

process.on('SIGINT', ()=>{
    console.log("Zamykanie połączenia") ;
    db.disconnect( ()=>{
        process.exit();
    })
})

function isValidDocument(doc){
    return doc && typeof(doc) === 'object' && Object.keys(doc).length > 0; 
}

module.exports = {
    list: listaOrzechow,
    add: addNewOrzech,
    get: getOrzechy,
    update: aktualizacjaOrzecha,
    delete: deleteOrzech,
}
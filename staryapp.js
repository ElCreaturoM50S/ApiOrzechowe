const express = require('express');
const mongoose = require('mongoose');
const joi = require("joi")  
const { error } = require("console");

const app = express();
app.use(express.json());

const BazaDanych = "orzechy"
const zrodlo = `mongodb://127.0.0.1:27017/${BazaDanych}`
const db = mongoose.connect;
const PORT = 2137;

//const copy = (object) => JSON.parse(JSON.stringify(object));
//const findOrzechById = (id) => orzechy.find((orzechy) => orzechy.id == id)
//const getOrzechy = (id) => copy(findOrzechById(id))
//const listaOrzechow = () => copy(orzechy)

const orzechSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    cena: {type: Number, required: true},
})

const OrzechModel = mongoose.model("Orzechy",orzechSchema, "Siatka")




mongoose.connect(zrodlo)
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Mam connection epicko");
});

app.get("/orzech", async (req,res)=>{
    try{
        // const collection = db.collection("Siatka")
        // const queryResult = collection.find({});
        // const allOrzechs = await queryResult.toArray();
        const allOrzechs = await OrzechModel.find({})
        res.send(allOrzechs);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get("/orzech/:id", async (req,res)=>{
    try{
        const orzech = await OrzechModel.findOne({id: parseInt(req.params.id)})

        if(!orzech) {
            return res.status(404).json({message: "Docuemnt not found"})
        }

        res.json(orzech)
    } catch(err)
        {
            console.log(err);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
);

app.post("/orzech", async (req,res)=>{
    try{
        console.log(req.body);
        // const newOrzech = req.body
        // const resultValid = orzechySchema.validate(newOrzech)
        // if(resultValid.error){
        //     return res.status(400).json({message: "Invalid ID format"})
        // }

        // const orzechId = parseInt(req.params.id)
        // if(!isValidDocument(newOrzech)){
        //     return res.status(400).json({message: "Invalid document format"})
        // }

        // const collection = db.collection("Siatka")
        // const result = await collection.insertOne(newOrzech)
        // if(!result.acknowledged) {
        //     return res.status(500).json({message:"Fail to add orzech"})
        // }
        const newOrzech = req.body

        const orzech = new OrzechModel(newOrzech)
        await orzech.validate()
        await orzech.save()

        res.status(201).json({message:"Doc added successfully"})
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.put("/orzech/:id", async (req,res)=>{
    try{
    //     const result = orzechySchema.validate(req.body)
    //     if(result.error){
    //         return res.status(400).json({message: "Invalid ID format"})
    //     }

    //     const orzechId = parseInt(req.params.id)
    //     if(isNaN(orzechId)){
    //         return res.status(400).json({message: "Invalid ID format"})
    //     }

    //     if(!isValidDocument(orzechToUpdate)){
    //         return res.status(404).json({message: "Invalid docuemnt foramt"})
    //     }
        
    //     const collection = db.collection("Siatka")
    //     const orzechToUpdate = await collection.replaceOne({id:orzechId},req.body)
    const orzechToUpdate = req.body
    const orzech = new OrzechModel(orzechToUpdate)
    await orzech.validate()

    const result = await OrzechModel.findOneAndUpdate(
        {id: parseInt(req.params.id)}, orzech
    )
    
    if(!result){
        return res.status(404).json({message: "Cat updated Successfully"})
    }

    res.json({message:"doc replaced"})
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.patch("/orzech/:id", async (req,res)=>{
    try{
    const orzechToUpdate = req.body
    const orzech = new OrzechModel(orzechToUpdate)
    await orzech.validate()

    const result = await OrzechModel.findOneAndUpdate(
        {id: parseInt(req.params.id)}, orzech
    )
    
    if(!result){
        return res.status(404).json({message: "Cat updated Successfully"})
    }

    res.json({message:"doc replaced"})
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.delete("/orzech/:id", async (req,res)=>{
    try{
        // const orzechId = parseInt(req.params.id)
        // if(isNaN(orzechId)){
        //     return res.status(400).json({message: "Invalid ID format"})
        // }
        // const collection = db.collection("Siatka")
        // const orzechToDelete = await collection.deleteOne({id:orzechId});
        // if(orzechToDelete.deletedCount === 0) {
        //     return res.status(404).json({message: "Document not found"})
        // }
        const orzechToDelete = await OrzechModel.findOne({id: req.correctId})
        if(orzechToDelete.deletedCount === 0){
            return res.status(404).json({message: "Document not found"})
        }
        res.json({message: "Hurra udalo sie skasowac orzecha"})
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.listen(PORT, () => {console.log(`Server jest w: Watykanie ${PORT}`)});

process.on('SIGINT', ()=>{
    console.log("Zamykanie połączenia") ;
    db.disconnect( ()=>{
        process.exit();
    })
})

function isValidDocument(doc){
    return doc && typeof(doc) === 'object' && Object.keys(doc).length > 0; 
}
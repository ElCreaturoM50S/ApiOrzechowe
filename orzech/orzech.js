//do zapisu plikow json
const fs = require("fs") 
const path = require("path")

//https://softchris.github.io/pages/joi.html#introducing-joi
const joi = require("joi")  


//load data z pliku typu Jasiek
let orzechy = require("./orzech.json");
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

const copy = (object) => JSON.parse(JSON.stringify(object));

const findOrzechById = (id) => orzechy.find((orzechy) => orzechy.id == id)

const getOrzechy = (id) => copy(findOrzechById(id));

const listaOrzechow = () => copy(orzechy)

const getNextId = () => {
    let lastOrzech = orzechy[orzechy.length - 1];
    return lastOrzech ? lastOrzech.id + 1 : 1;
}

const save = () => {
    fs.writeFile(
        path.join(__dirname, "orzech.json"),
        JSON.stringify(orzechy, null, 3),
        (error) => {
            if (!error) console.log("Dane zostały poprawnie zapisane");
            else console.log(`Nie zapisano danych ${error}`);
        }
    )
}

const addNewOrzech = (orzechDane) => {
    //validacja danych
    orzechDane.id = getNextId();
    const result = orzechySchema.validate(orzechDane);

    if (result.error) {
        throw new Error(`zła nowego walidacja orzecha`);
    }

    orzechy.push(orzechDane);
    save();
    return getOrzechy(orzechDane.id);
}

const aktualizacjaOrzecha = (orzechDane) => {
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
}



const deleteOrzech = (id) => {
    let orzech = findOrzechById(id);
    let index = orzechy.indexOf(orzech)
    orzechy.splice(index, 1);
    console.log(`usunięto orzechy: ${orzech.nazwa}`);
    save()
    console.log("po orzechu");
    return copy(orzech)
} 

module.exports = {
    list: listaOrzechow,
    add: addNewOrzech,
    get: getOrzechy,
    update: aktualizacjaOrzecha,
    delete: deleteOrzech,
}
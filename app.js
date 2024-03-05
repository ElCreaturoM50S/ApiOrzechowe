import express, { json } from 'express'
const app = express()
import { router } from "./routes.mjs"
import { db } from "./db.mjs"

app.use(json())
app.use('/', router)

const port = 2137

app.listen(port, async ()=> {
    console.log('listening on port ${port}')
})

process.on('exit', ()=>{
    console.log("Zamykanie połączenia") ;
    db.close(()=>{
        process.exit();
    })
})

const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

pokemon.post("/", (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next)=>{
    const kuery = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(kuery);
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next)=>{
    const id = req.params.id;
    if(id > 0 && id <= 722){
        const kuery = await db.query("SELECT * FROM pokemon WHERE pok_id = '"+id+"'");
        return res.status(200).json(kuery);
    }
    return res.status(404).send("Error404: pokimon id not found")
}); 

pokemon.get("/:name([A-Za-z]+)", async (req, res, next)=>{
    const name = req.params.name;
    const kuery = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name+"'");
    console.log(kuery.lenght)
    if (kuery == undefined){
        return res.status(400).send("Error404: pokimon name not found");
    }
    return res.status(200).json(kuery);
});

module.exports = pokemon;

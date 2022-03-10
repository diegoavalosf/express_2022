
const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next)=>{
    const kuery = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: kuery});
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next)=>{
    const id = req.params.id;
    if(id > 1 && id <= 722){
        const kuery = await db.query("SELECT * FROM pokemon WHERE pok_id = '"+id+"'");
        return res.status(200).json({code: 1, message: kuery});
    }
    return res.status(404).send({code: 1, message: "Error404: pokimon id not found"})
}); 

pokemon.get("/:name([A-Za-z]+)", async (req, res, next)=>{
    const name = req.params.name;
    const kuery = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name+"'");
    if (kuery.length > 0){
        return res.status(200).json({code: 1, message: kuery});
    }
    return res.status(400).send({code: 1, message: "Error404: pokimon name not found"});
});

module.exports = pokemon;

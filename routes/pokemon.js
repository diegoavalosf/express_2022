
const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", async(req, res, next)=>{
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Pokimon inserted correctly"})
        }
        return res.status(500).json({code: 500, message: "Error:("});
    }
    return res.status(500).json({code:500, message:"Error: Empty fields"})
});

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next)=>{
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "pokimon deleted correctly"});
    }
    return res.status(404).json({code: 404, message: "pokimon not found"});
})

pokemon.put("/:id([0-9]{1,3})", async(req, res, next)=>{
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name ='${pok_name}', pok_height=${pok_height}, pok_weight=${pok_weight}, `
        query += `pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Pokimon updated correctly"})
        }
        return res.status(500).json({code: 500, message: "Error:("});
    }
    return res.status(500).json({code:500, message:"Error: Empty fields"})
})

pokemon.patch("/:id([0-9]{1,3})", async(req, res, next)=>{

    if(req.body.pok_name){    
        let query = `UPDATE pokemon SET pok_name ='${req.body.pok_name}' WHERE pok_id=${req.params.id}`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Pokimon updated correctly"})
        }
        return res.status(500).json({code: 500, message: "Error:("});
    }
    return res.status(500).json({code: 500, message: "Error: Empty fields"});
})

pokemon.get("/", async (req, res, next)=>{
    const kuery = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: kuery});
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next)=>{
    const id = req.params.id;
    if(id > 1 && id <= 722){
        const kuery = await db.query("SELECT * FROM pokemon WHERE pok_id = '"+id+"'");
        return res.status(200).json({code: 200, message: kuery});
    }
    return res.status(404).send({code: 404, message: "Error404: pokimon id not found"})
}); 

pokemon.get("/:name([A-Za-z]+)", async (req, res, next)=>{
    const name = req.params.name;
    const kuery = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name+"'");
    if (kuery.length > 0){
        return res.status(200).json({code: 200, message: kuery});
    }
    return res.status(400).send({code: 404, message: "Error404: pokimon name not found"});
});

module.exports = pokemon;

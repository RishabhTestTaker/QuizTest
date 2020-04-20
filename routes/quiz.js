const createError = require('http-errors');
const express = require('express');
const database = require('../models/sqlite3db').database;
const router = express.Router();

router.get('/:quiz_id', function(req, res, next) {
try{
    console.log(req.body);
    console.log(req.params.quiz_id)
    let quiz_id = req.params.quiz_id;
    if(typeof quiz_id==="undefined"){
        let failObj = {
            "status": "failure",
            "reason": "parameter missing"
        }
        console.error("parameter missing");
        res.status(400).send(failObj);
        return;
    }
    let sql = `SELECT quiz_id, name, description
       FROM quizzes
       WHERE quiz_id  = ?`;
    database.get(sql, [quiz_id], (err, row) => {
        if(typeof row === 'undefined' ){
            res.status(404).send({});
        } else if(err){
            let failObj = {
                "status": "failure",
                "reason": err.message
            }
            console.error(err.message);
            res.status(400).send(failObj);
        } else{
            let resObj = {
                "id": quiz_id,
                "name": row.name,
                "description": row.description
            }
            res.status(200).send(resObj);
        }
    });
}catch(err){
    let failObj = {
        "status": "failure",
        "reason": err.message
    }
    console.error(err.message);
    res.status(400).send(failObj);
}

});
router.post('/', function(req, res, next) {
    try{
        console.log(req.body);
        let quiz_name = req.body.name;
        let description = req.body.description;
        if(typeof quiz_name==="undefined"||typeof description ==="undefined"){
            let failObj = {
                "status": "failure",
                "reason": "parameter missing"
            }
            console.error("parameter missing");
            res.status(400).send(failObj);
            return;
        }
        console.log("quiz_name "+quiz_name+" description "+description);
        let sql = 'INSERT INTO quizzes(name,description) values ("'+quiz_name+'","'+description+'")';
        database.run(sql,[],function (err) {
            if(err){
                let failObj = {
                    "status": "failure",
                    "reason": err.message
                }
                console.error(err.message);
                res.status(400).send(failObj);
            }else{
                let resObj = {
                    "id": this.lastID,
                    "name": quiz_name,
                    "description": description
                }
                console.log(resObj)
                res.status(201).send(resObj);
            }
        });
    }catch (err) {
        console.error(err);
        let failObj = {
            "status": "failure",
            "reason": err
        };

        res.status(400).send(failObj);
    }

});

module.exports = router;

const createError = require('http-errors');
const express = require('express');
const database = require('../models/sqlite3db').database;
const router = express.Router();

router.get('/:question_id', function (req, res, next) {
    try {
        console.log(req.body);
        let question_id = req.params.question_id;
        if (typeof question_id === "undefined") {
            let failObj = {
                "status": "failure",
                "reason": "parameter missing"
            }
            console.error("parameter missing");
            res.status(400).send(failObj);
            return;
        }
        let sql = `SELECT question_id, name, options, correct_option, quiz_id, points
       FROM questions
       WHERE question_id  = ?`;
        database.get(sql, [question_id], (err, row) => {
            if (typeof row === 'undefined') {
                res.status(404).send({});
            } else if (err) {
                let failObj = {
                    "status": "failure",
                    "reason": err.message
                }
                console.error(err.message);
                res.status(400).send(failObj);
                return;
            } else {
                let resObj = {
                    "id": question_id,
                    "name": row.name,
                    "options": row.options,
                    "correct_option": row.correct_option,
                    "quiz": row.quiz_id,
                    "points": row.points
                };
                res.status(200).send(resObj);
            }
        });
    } catch (err) {
        let failObj = {
            "status": "failure",
            "reason": err.message
        }
        console.error(err.message);
        res.status(400).send(failObj);
    }

});
/*
router.post('/', function(req, res, next) {
    try{
        console.log("question post")
        console.log(req.body);
        let question_name = req.body.name;
        let options = req.body.options;
        let correct_option = req.body.correct_option
        let quiz_id = req.body.quiz;
        let points = req.body.points;
        if(!question_name||!options||!correct_option||!quiz_id||!points){
            let failObj = {
                "status": "failure",
                "reason": "parameter missing"
            }
            console.error("parameter missing");
            res.status(400).send(failObj);
            return;
        }

        let sql = 'INSERT INTO questions(name,options,correct_option,quiz_id,points) values ("'
            +question_name+'","'+options+'","'
            +correct_option+'","'+quiz_id+'","'+points+
            '")';
        database.run(sql,[],function (err) {
            if(err){
                let failObj = {
                    "status": "failure",
                    "reason": err.message
                }
                console.error(err.message);
                res.status(400).send(failObj);
                return;
            }else{
                let resObj = {
                    "id": this.lastID,
                    "name": question_name,
                    "options": options,
                    "correct_option": correct_option,
                    "quiz": quiz_id,
                    "points": points
                };
                console.log(resObj)
                res.status(201).send(resObj);
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
*/
router.post('/', function (req, res, next) {
    try {
        console.log("question post")
        console.log(req.body);
        let question_name = req.body.name;
        let options = req.body.options;
        let correct_option = req.body.correct_option
        let quiz_id = req.body.quiz;
        let points = req.body.points;
        if (!question_name || !options || !correct_option || !quiz_id || !points) {
            let failObj = {
                "status": "failure",
                "reason": "parameter missing"
            }
            console.error("parameter missing");
            res.status(400).send(failObj);
            return;
        }

        let questionSql = 'INSERT INTO questions(name,options,correct_option,quiz_id,points) values ("'
            + question_name + '","' + options + '","'
            + correct_option + '","' + quiz_id + '","' + points +
            '")';
        let quizSql = `SELECT quiz_id, name, description
            FROM quizzes
            WHERE quiz_id  = ?`;


            database
                .get(quizSql, [quiz_id], (err, row) => {
                    if(err){
                        console.log("in error")
                        flag = false
                        let failObj = {
                            "status": "failure",
                            "reason": "non existent key"
                        }
                        //     console.log(err);
                        res.status(400).send(failObj);
                    }
                    else if (typeof row === 'undefined') {
                        flag = false
                        let failObj = {
                            "status": "failure",
                            "reason": "non existent key"
                        }
                        //     console.log(err);
                        res.status(400).send(failObj);
                    }else{
                        database.run(questionSql, [], function (err) {
                            console.log("I am here")
                            if (err) {
                                let failObj = {
                                    "status": "failure",
                                    "reason": err.message
                                }
                                console.error(err.message);
                                res.status(400).send(failObj);
                                return;
                            } else {
                                let resObj = {
                                    "id": this.lastID,
                                    "name": question_name,
                                    "options": options,
                                    "correct_option": correct_option,
                                    "quiz": quiz_id,
                                    "points": points
                                };
                                console.log(resObj)
                                res.status(201).send(resObj);
                            }
                        });
                    }
                })




    } catch (err) {
        console.log("I am here")
        let failObj = {
            "status": "failure",
            "reason": "non existent key"
        }
   //     console.log(err);
        res.status(400).send(failObj);

    }
});

module.exports = router;
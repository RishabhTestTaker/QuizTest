const createError = require('http-errors');
const express = require('express');
const database = require('../models/sqlite3db').database;
const router = express.Router();

router.get('/:quiz_id',  function(req, res, next) {
    try{
   //     console.log("Inside quiz-question")
        let quiz_id = req.params.quiz_id;
        let quizObj;
        let questions = [];

        if(typeof quiz_id==="undefined"){
            res.status(404).send({});
            return;
        }
         database.serialize(()=>{
   //         console.log("Inside serialize")
            let quizSql = `SELECT quiz_id, name, description
            FROM quizzes
            WHERE quiz_id  = ?`;
            let questionSql = `SELECT question_id, name, options, correct_option,quiz_id,points
            FROM questions
            WHERE quiz_id  = ?`;
            database
                .each(questionSql,[quiz_id],(err,row)=>{
                    if(err){
                        console.error(err.message);
                        res.status(404).send({});
                    }else if(typeof row === 'undefined' ){
                        res.status(404).send({});
                    }else{
       //                 console.log("each's else")
                        let questionObj = {
                            "id": row.question_id,
                            "name": row.name,
                            "options": row.options,
                            "correct_option": row.correct_option,
                            "quiz": quiz_id,
                            "points": row.points
                        };
                        questions.push(questionObj);
                    }
                })
                .get(quizSql, [quiz_id], (err, row) => {
                if(err){
                    throw err.message;
                }else if(typeof row === 'undefined' ){
                    res.status(404).send({});
                }else{
                    quizObj = {
                        "name": row.name,
                        "description": row.description
                    }
      //              console.log("get's else")
                    quizObj.questions = questions;
                    res.status(200).send(quizObj);
                }
                });
    //        console.log("just before ending of serialize")
            // quizObj.questions = questions;
            // res.status(200).send(quizObj);
        });
 //       console.log("outside serialize")

    }catch(err){
        res.status(404).send({});
    }

});


module.exports = router;

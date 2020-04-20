const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./Data/quiz_question.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


/*

//db schema

CREATE TABLE quizzes (
    quiz_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL ,
    description TEXT NOT NULL
);

CREATE TABLE questions(
    question_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL ,
    options TEXT NOT NULL,
    correct_option INTEGER NOT NULL,
     points INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    FOREIGN KEY(quiz_id)
    REFERENCES quizzes (quiz_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

*/


/*
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});*/
module.exports ={
    sqlite3,
    database
};
const sqlite3 = require('sqlite3').verbose();
const questionsDB = new sqlite3.Database('./Data/questions.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
const quizDB = new sqlite3.Database('./Data/questions.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
/*
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});*/
module.exports ={
    sqlite3,
    questionsDB,
    quizDB
};
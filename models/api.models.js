const db = require ('../db/connection')


function getAllTopics() {
    return db.query('SELECT * FROM topics;')
        .then((result) => result.rows) 
        .catch((err) => {
            console.error(err);
            throw new Error("Error fetching topics from the database");
        });
}

function getArticleById(article_id) {
    return db
        .query('SELECT * FROM articles WHERE article_id = $1', [article_id]) 
        .then((result) => result.rows[0]); //returns the first article found, or undefined if there is not one
}

module.exports = { getAllTopics, getArticleById };

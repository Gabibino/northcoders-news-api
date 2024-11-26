const db = require ('../db/connection')


function getAllTopics() {
    return db.query('SELECT * FROM topics;')
        .then((result) => result.rows) 
        .catch((err) => {
            console.error(err);
            throw new Error("Error fetching topics from the database");
        });
}

module.exports = { getAllTopics };

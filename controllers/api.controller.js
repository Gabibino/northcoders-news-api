const endpointsJson = require("../endpoints.json");
const {getAllTopics} = require ('../models/api.models');
const { getArticleById } = require('../models/api.models');  

function getApi(req, res) {
    console.log(endpointsJson, "<--- endpoints json");
    res.status(200).send({endpoints: endpointsJson})
}
function getApiTopics (req, res){
    getAllTopics()
    .then((topics) => {
        res.status(200).send({ topics }); // Envia a resposta com os tópicos
    })
    .catch((err) => {
        res.status(500).send({ error: "Failed to fetch topics" });  // Erro caso não consiga obter os tópicos
    });
}

function getApiArticleById(req, res) {
    const { article_id } = req.params; // Pega o article_id da URL

    //checking if article_id is valid (if it is a number as an exemple)
    if (isNaN(article_id)) {
        return res.status(400).send({ error: "Invalid article ID" });
    }

    getArticleById(Number(article_id)) //converting it to a number in case is not
        .then((article) => {
            if (!article) {
                return res.status(404).send({ error: "Article not found" });
            }
            res.status(200).send(article); //send the article found
        });
}


module.exports = {getApi, getApiTopics, getApiArticleById};
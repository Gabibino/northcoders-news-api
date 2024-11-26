const endpointsJson = require("../endpoints.json");
const {getAllTopics} = require ('../models/api.models')

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


module.exports = {getApi, getApiTopics};
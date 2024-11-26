const express = require ('express');
const app= express();
const fs = require ('fs/promises');
const {getApi, getApiTopics, getApiArticleById} = require('./controllers/api.controller');

app.use(express.json());

app.get('/api', getApi)
app.get('/api/topics', getApiTopics)
app.get('/api/articles/:article_id', getApiArticleById);
module.exports = app;
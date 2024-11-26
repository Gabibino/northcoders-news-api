const express = require ('express');
const app= express();
const fs = require ('fs/promises');
const {getApi, getApiTopics} = require('./controllers/api.controller');

app.use(express.json());

app.get('/api', getApi)
app.get('/api/topics', getApiTopics)
module.exports = app;
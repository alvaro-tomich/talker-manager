const routes = require('express').Router();
const fs = require('fs');

routes.get('/talker', async (_req, res) => {
  const data = await JSON.parse(fs.readFileSync('talker.json'));
  if (data.length === 0) {
    res.status(200).send([]);
  }
    res.status(200).json(data);
});

routes.get('/talker/:id', async (req, res) => {
  const data = await JSON.parse(fs.readFileSync('talker.json'));
  const { id } = req.params;
  const filteredData = data.find((talker) => talker.id === parseInt(id, 10));
  if (!filteredData) res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  res.status(200).json(filteredData);
});

module.exports = routes;

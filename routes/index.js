const routes = require('express').Router();
const fs = require('fs');

routes.get('/talker', async (_req, res) => {
  const data = await JSON.parse(fs.readFileSync('talker.json'));
  if (data.length === 0) {
    res.status(200).send([]);
  }
    res.status(200).json(data);
});

module.exports = routes;

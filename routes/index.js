const routes = require('express').Router();
const fs = require('fs');

routes.get('/talker', async (_req, res) => {
  const talkers = await JSON.parse(fs.readFileSync('talker.json'));
  if (talkers.length === 0) {
    return res.status(200).send([]);
  }
    return res.status(200).json(talkers);
});

routes.get('/talker/:id', async (req, res) => {
  const talkers = await JSON.parse(fs.readFileSync('talker.json'));
  const { id } = req.params;
  const findTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(findTalker);
});

module.exports = routes;

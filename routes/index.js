const routes = require('express').Router();
const fs = require('fs');
const generateToken = require('../utilities/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validate = require('../middlewares/index');
const getTalkers = require('../utilities/getTalkers');

routes.get('/talker', async (req, res) => {
  console.log(req.headers);
  const talkers = await getTalkers();
  if (talkers.length === 0) {
    return res.status(200).send([]);
  }
    return res.status(200).json(talkers);
});

routes.post('/talker', 
  validate.token, validate.name, validate.age, validate.talk, validate.rate, 
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const talkersId = talkers.map((talker) => talker.id);
  const newTalkerId = Math.max(...talkersId) + 1;
  const talker = { id: newTalkerId, name, age, talk };
  fs.writeFileSync('talker.json', JSON.stringify([talker]), 'utf-8');
  return res.status(201).json(talker);
});

routes.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const findTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(findTalker);
});

routes.put('/talker/:id', 
  validate.token, validate.name, validate.age, validate.talk, validate.rate,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  fs.writeFileSync('talker.json', JSON.stringify(talkers), 'utf-8');
  res.status(200).json({ id: parseInt(id, 10), name, age, talk });
});

routes.post('/login', validateEmail, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token: `${token}` });
});

module.exports = routes;

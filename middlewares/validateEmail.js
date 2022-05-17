module.exports = (req, res, next) => {
    const { email, password } = req.body;
    const checkEmail = /^[a-z-0-9]+@[a-z]+.[a-z]+$/.test(email);
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (!checkEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};
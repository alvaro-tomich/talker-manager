module.exports = (req, res, next) => {
    const { talk } = req.body;
    const verifyData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

    if (!talk || !talk.watchedAt) { 
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    if (!verifyData.test(talk.watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    return next();
};
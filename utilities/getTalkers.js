const fs = require('fs');

module.exports = async () => {
    const talkers = await JSON.parse(fs.readFileSync('talker.json'));
    return talkers;
};
const jwt = require('jsonwebtoken');
module.exports = async (payload) => {
    const token = jwt.sign(payload,
         process.env.JWT_Secret_Key,
         {expiresIn: '1h'});
    return token;
}
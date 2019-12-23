const axios           = require('axios');
const {getAuthToken}  = require('./utils');

const isUserLoggedIn = (req, res, next) => {  
  const accessToken = getAuthToken(req.headers.authorization);
    axios.get(`${process.env.AUTH_API}/user/profile`, {
      headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      let statusCode = response.status;
      console.log(statusCode);
      if (statusCode !== 200) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }
      next();
    })
    .catch(err => {
      return res.status(401).json({
        message: "Unauthorized"
      });
    });
};

module.exports = {
    isUserLoggedIn
};

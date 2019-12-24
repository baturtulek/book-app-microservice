const axios           = require('axios');
const {getAuthToken}  = require('./utils');

const isUserLoggedIn = (req, res, next) => {
  const accessToken = getAuthToken(req.headers.authorization);
    axios.get(`${process.env.AUTH_API}/users/profile`, {
      headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      console.log(response.status);
      let statusCode = response.status;
      if (statusCode !== 200) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }
      req.userData = response.data.data;
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

const getAuthToken = authorization => {
  let accessToken = authorization || '';
  accessToken = accessToken.replace('Bearer ', '');
  return accessToken;
};

module.exports = {
  getAuthToken
};

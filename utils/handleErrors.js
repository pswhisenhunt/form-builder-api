var handleErrors = function (res, code, message) {
  res.status(code || 500).json({"error": message});
};

module.exports = {
  handleErrors: handleErrors
};

// To address the below error
//Access to XMLHttpRequest at 'http://localhost:3900/api/expenses' from origin 'http://localhost:3000' has been
//blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
};

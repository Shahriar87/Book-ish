const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// const options = {
//   allow: {
//     origin: '*',
//     methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
//     headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
//   }
// }

// app.use(cors(options));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// // Importing models
// var db = require('./models');

// Define API routes here
require("./routes/apiRoutes")(app, express);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

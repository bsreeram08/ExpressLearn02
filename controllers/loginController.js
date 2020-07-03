const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
const path = require("path");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://fb-node-learn.firebaseio.com",
});
const db = firebase.firestore();
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views", "login.html"));
};
exports.performLogin = (req, res) => {
  console.log(req.body);
  //console.log(req.body.password);
  //res.redirect("/");
  res.send("clicked");
};

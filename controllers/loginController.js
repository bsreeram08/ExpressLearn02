const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
const path = require("path");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://project-interns.firebaseio.com"
});
const db = firebase.firestore();
const adminsRef = db.collection('Admins');
const usersRef = db.collection('Users');
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views", "login.html"));
};
exports.performLogin = async (req, res) => {
  if (req.body.admin === undefined) {
    try {
      const snapShot = await usersRef.where('username', '==', req.body.emailId).get();
      if (snapShot.empty) {
        console.log("User Not Found");
        res.send("not found");
      }
      snapShot.forEach(doc => {
        if (req.body.password === doc.data().password) {
          // res.sendFile(path.join(__dirname, "../Views", "toDo.html", doc));
          res.send("Logged in");
        }
        else {
          res.send("Password does not Match.");
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  else {
    try {
      const snapShot = await adminsRef.where('username', '==', req.body.emailId).get();
      if (snapShot.empty) {
        console.log("Admin Not Found");
        res.send("not found");
      }
      snapShot.forEach(doc => {
        if (req.body.password === doc.data().password) {
          //res.sendFile(path.join(__dirname, "../Views", "toDo.html", doc));
          res.send("Logged in");
        }
        else {
          res.send("Password does not Match.");
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }
};

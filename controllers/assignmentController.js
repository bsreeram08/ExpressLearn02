const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
const path = require("path");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fb-node-learn.firebaseio.com",
}, "toDO");
const db = firebase.firestore();
//const adminsRef = db.collection('Admins');
const usersRef = db.collection('Users');
exports.addAssignment = async (req, res) => {
    if (req.body.userType === 'users') {
        let id;
        let data;
        data = await usersRef.where('username', '==', req.body.username).get();
        if (data.empty) {
            res.send('user not found');
        }
        else {
            data.forEach(async doc => {
                id = doc.id;
                const myuserref = usersRef.doc(id);
                const obj = JSON.parse(doc.data().assignment);
                if (obj != undefined) {
                    obj.week[parseInt(req.body.assignmentWeek)] = req.body.url;
                }
                else {
                    obj.week = [];
                    obj.week[parseInt(req.body.assignmentWeek)] = req.body.url;
                }
                await myuserref.update({
                    'assignment': `${JSON.stringify(obj)}`
                });
                res.send('added');
            });

        }
    }
    else {
        const allUsers = await usersRef.get();
        const responseObj = {};
        responseObj.users = [];
        let constructObj;
        allUsers.forEach(doc => {
            constructObj = {};
            constructObj.name = doc.data().username;
            constructObj.assignment = doc.data().assignment;
            responseObj.users.push(constructObj);
            res.send(responseObj);
        });
    }
}
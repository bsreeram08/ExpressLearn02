const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fb-node-learn.firebaseio.com",
}, "assignments");
const db = firebase.firestore();
const usersRef = db.collection('Users');
exports.addAssignment = async (req, res) => {
    const body = req.body;
    const uid = body.uid;
    const assignmentId = body.assignmentId;
    const assignmentData = body.assignment;
    const userType = body.userType;
    const userRef = await usersRef.doc(uid);
    const userData = await userRef.get();
    if (!userData.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "User Not found!"
        });
        return;
    }
    if (userType != "users") {
        res.status(405).send({
            status: "ERROR",
            message: "Operation not permitted for this user."
        });
        return;
    }
    let addedResponse;
    const user = userData.data();
    let assignments = {};
    if (user.assignments !== undefined) {
        assignments = JSON.parse(user.assignments);
    }
    assignments[assignmentId] = assignmentData;
    addedResponse = await userRef.update({ "assignments": JSON.stringify(assignments) });
    console.log(addedResponse);
    res.status(200).send({
        status: "SUCESS",
        message: "Data Added Sucessfully",
        timestamp: JSON.stringify(addedResponse)
    });
    return;
}
exports.AllAssignments = async (req, res) => {
    const allUsers = await usersRef.get();
    const responseObj = { assignments: [] };
    let constructObj;
    if (allUsers.empty) {
        res.status(404).send({
            status: "ERROR",
            message: "No users found"
        });
    }
    allUsers.forEach(user => {
        constructObj = {};
        constructObj.name = user.data().username;
        constructObj.assignment = JSON.parse(user.data().assignments);
        responseObj.assignments.push(constructObj);
    });
    res.status(200).send({
        ststus: "SUCESS",
        message: "All the data is available",
        data: (responseObj)
    });
}
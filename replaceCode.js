const admin = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fb-node-learn.firebaseio.com",
});
const db = firebase.firestore();
const usersRef = db.collection("Users");
exports.addAssignment = async (req, res) => {
    const body = req.body;
    const uid = body.uid;
    const assignmentId = body.id;
    const assignmentUrl = body.url;
    const userRef = await usersRef.doc(uid).get();
    if (userRef.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "Operation Not permitted for users",
        });
        return;
    }
    const user = userRef.data();
    if (user.type !== "users") {
        res.status(404).send({
            status: "ERROR",
            message: "Operation Not permitted for users",
        });
        return;
    }
    const assignment = !!user.assignment ?
        user.assignment.find((v) => v.id === assignmentUrl) :
        null;
    if (assignment) {
        await userRef.update({
            assignment: admin.firestore.FieldValue.arrayRemove(assignment),
        });
    }
    await userRef.update({
        assignment: admin.firestore.FieldValue.arrayUnion({
            id: assignmentId,
            url: assignmentUrl,
        }),
    });
    res.status(200).send({ status: "SUCCESS", data: "Assignment Added" });
    return;
};

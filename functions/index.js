const functions = require('firebase-functions');
const admin =  require("firebase-admin");
admin.initializeApp(functions.config().firebase); // can use the admin sdk to interact with different services.

// deploy using `firebase deploy --only functions`

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Planner!");
});

const createNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification).then(doc => {
        console.log('notification added', doc);
    })
}

// setup a trigger that triggers this function when a new document is created in the projects with an id. It then does a callback with the created document.
exports.projectCreated = functions.firestore.document('projects/{projectId}').onCreate((doc) => {
    const project = doc.data();
    const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});

// a trigger that is fired when a user is created using the auth service. we create user in the users collection after they sign up using the auth service. we are then
// getting that user from the users collection.
exports.userJoined = functions.auth.user().onCreate(user => {

    // getting the record from the users collection and after the get, we get the firestore doc for the user
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newuser = doc.data();
        const notification = {
            content: 'joined the party',
            user: `${newuser.firstName} ${newuser.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    });
});
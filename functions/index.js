const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//const firestore = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.createUserAccount=functions.auth.user().onCreate(event=>{

// console.log(event.data);
// // const usersRef=firestore.collection('users');
// // const query = usersRef.where("email", "==", event.data;
// // const token=query.token;
// // console.log(token);
// // const payload = {

// //   notification: {

// //     title: 'Greetings '+event.data.email+ ' from all of us at Bookish',

// //     body: `Either write something worth reading or do something worse writing`,



// //   }

// // };
// return admin.messaging().sendToDevice(token, payload);



// })

exports.sendPushNotificationOnRegistration = functions.firestore.document("users/{userId}")
    .onCreate((snap, context) => {
        const userData = snap.data();
        const uid = userData.uid;
        console.log(uid);
       
        const displayName = userData.email;
        console.log(displayName)
        let payload = {
            notification: {
                title: "Hello " + displayName,
                body: "Welcome to Bookish"
            }
        };
        var pushToken = "";
        return admin.firestore().collection("users").doc(uid).get().then(doc => {
            let data = doc.data();
            pushToken = data.token;
            console.log(pushToken)
            return admin.messaging().sendToDevice(pushToken, payload);
        });
    });

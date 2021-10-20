// const functions = require("firebase-functions");

// const admin = require("firebase-admin");
// admin.initializeApp();

// exports.addAdminRole = functions.https.onCall((data, context) => {
//   return admin
//     .auth()
//     .getUserByEmail(data.email)
//     .then((user) => {
//       return admin.auth().setCustomUserClaims(user.uid, {
//         admin: true,
//       });
//     })
//     .then(() => {
//       return {
//         message: `Success! ${data.firstName} has become an admin!`,
//       };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//    //add to the firebase firestore rules online...
// service cloud.firestore {
//       match /databases/ {database}/documents {
//             match /users/{userID} {
//                   allow read;
//                   allow write: if request.auth.uid != null;
//             }
//             match /blogPosts/{postID} {
//                   allow read;
//                   allow write: if request.auth.token.admin == true;

//             }
//       }
// }
//add to the firebase storage rules online...
// rules_version = '2';
// service firebase.storage {
//       match /b/{bucket}/o {
//       match /{allPaths=**} {
//             allow read,
//             write: if request.auth.token.admin == true;
//       }
//       }
// }

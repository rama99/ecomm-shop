import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAqYVbvwmgBtgPK4PI87MDw9qAv3dtIQFI",
    authDomain: "ecomm-shop-8924e.firebaseapp.com",
    databaseURL: "https://ecomm-shop-8924e.firebaseio.com",
    projectId: "ecomm-shop-8924e",
    storageBucket: "ecomm-shop-8924e.appspot.com",
    messagingSenderId: "962326443842",
    appId: "1:962326443842:web:958d14a357d7b322cd3adb"
}

export const createUserProfileDocument = async (userAuth , additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName , email } = userAuth;
        const createdAt = new  Date();
    

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(err) {

        }

    }

    return userRef;
}

firebase.initializeApp(config);

export const  auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new  firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: `select_account`});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
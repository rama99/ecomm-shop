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


export const addCollectionAndDocuments = async (collectionKey , objectsToAdd ) => {

    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef , obj )
    });

    return await batch.commit();
}

export const  convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
    
    const transformedCollection = collectionsSnapshot.docs.map((doc) => {
        const {title , items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator , collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const getCurrentUser = () => {

    return new Promise( (resolve , reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

firebase.initializeApp(config);

export const  auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new  firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({prompt: `select_account`});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
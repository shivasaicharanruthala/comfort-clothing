import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw58Q9Sn8_cs1WZNpjGTT4TKQpne1LMzk",
    authDomain: "crwn-clothing-db-a35c1.firebaseapp.com",
    projectId: "crwn-clothing-db-a35c1",
    storageBucket: "crwn-clothing-db-a35c1.appspot.com",
    messagingSenderId: "774917268390",
    appId: "1:774917268390:web:6f0d7f5d84ea136c196567"
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})


export const auth = new getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = collection(db, collectionKey);
//     const batch = writeBatch(db);
//
//     objectsToAdd.forEach(obj => {
//         const docRef = doc(collectionRef, obj.title.toLowerCase());
//         batch.set(docRef, obj);
//     })
//
//     await batch.commit();
// }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(obj => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    const userDocRef = await doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef)
    if (!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            })
        } catch (err) {
            console.log("error creating user: ", err.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = async (callback) => onAuthStateChanged(auth, callback);
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCmVRuB-o0Db2AH9sp2qn2tCyrx4LgBMo",
  authDomain: "netflix-clone-72d44.firebaseapp.com",
  projectId: "netflix-clone-72d44",
  storageBucket: "netflix-clone-72d44.firebasestorage.app",
  messagingSenderId: "621063280604",
  appId: "1:621063280604:web:7cb6f165bbed95f2aee119"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.error("Error is ",error)
        alert(error)
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error("Error is ", error)
        alert(error)
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}
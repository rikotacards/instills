import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const onSignInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res
}
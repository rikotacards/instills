import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const onSignInWithGoogle = async() => {
    const userAgent = window.navigator.userAgent;
    const url = window.location.href;

    if (userAgent.includes("Instagram")) {
        // if logging in from instagram, we need to 
        // kick them out of the app into device browser.
        window.location.href = "x-safari-" + url;
        return;
      }

    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res
}
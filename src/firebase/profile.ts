import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { IUser } from "../types";
import { db } from "./firebaseConfig";

export const updateProfile = async (args: Partial<IUser>) => {
  if (!args.uid) {
    throw "Requires UID";
  }
  try {
    const docRef = await setDoc(
      doc(db, "users", args.uid),
      {
        ...args,
      },
      { merge: true }
    );
    return docRef;
  } catch (e) {
    alert(e);
  }
};
export const getUser = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), uid: docSnap.id } as IUser;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return {
        username: "",
        name: "",
        bio: undefined,
        uid: "",
        profilePhotoUrl: "",
      };
    }
  } catch (e) {
    alert(e);
  }
};

export const getUid = async (username: string) => {
  const docRef = doc(db, "usernames", username);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), uid: docSnap.id } as IUser;
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  } catch (e) {
    alert(e);
  }
};
// {username: uid}
const updateUsername = async (username: string, uid: string) => {
  try {
    const docRef = await setDoc(
      doc(db, "usernames", username),
      {
        uid: uid,
        dateAdded: serverTimestamp(),
      },
      { merge: true }
    );
    return docRef;
  } catch(e){
    alert(e)
  }
}
export const addUsername = async (username: string, uid: string) => {
  try {
    const res = await getUid(username);
    if (res) {
      if (res?.uid === uid) {
        await updateUsername(username, uid)
      } else {
        throw "Username exists";
      }
    } else {
      const docRef = await setDoc(
        doc(db, "usernames", username),
        {
          uid: uid,
          dateAdded: serverTimestamp(),
        },
        { merge: true }
      );
      return docRef;
    }
  } catch (e) {
    return e;
  }
};
// {uid: usernameff}

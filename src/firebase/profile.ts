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
     return undefined
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
      return { ...docSnap.data() } as IUser;
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  } catch (e) {
    alert(e);
  }
};
// {username: uid}
const updateUsername = async (username: string, uid: string, name?: string) => {
  try {
    const docRef = await setDoc(
      doc(db, "usernames", username),
      {
        uid: uid,
        username,
        dateAdded: serverTimestamp(),
        name
      },
      { merge: true }
    );

    await updateProfile({username, uid, name})

    return docRef;
  } catch(e){
    alert(e)
  }
}

export const checkUsernameExists = async(username: string) => {
  const docRef = doc(db, "usernames", username);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true
    } else {
      return false
    }
  } catch (e) {
    alert(e);
  }
}

export const addUsername = async (username: string, uid: string, name?: string) => {
  try {
    const res = await checkUsernameExists(username);
    if (res) {
      throw('Username taken')
      }
     else {
      await updateUsername(username, uid, name)
    }
  } catch (e) {
    return e;
  }
};

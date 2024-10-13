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
      return { username: "", name: "", bio: undefined, uid: "", profilePhotoUrl: "" };
    }
  } catch (e) {
    alert(e);
  }
};

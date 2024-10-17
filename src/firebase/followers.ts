import {
  addDoc,
  and,
  collection,
  deleteDoc,
  deleteField,
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

interface AddFollowerProp {
  uid: string;
  otherUid: string;
}
export const addFollower = async (args: AddFollowerProp) => {
  if (!args.uid) {
    throw "Requires UID";
  }
  try {
    const docRef = await setDoc(
      doc(db, "followers", args.otherUid),
      {
        followers: { [args.uid]: true },
      },
      { merge: true }
    );
    return docRef;
  } catch (e) {
    alert(e);
  }
};

export const addFollowing = async (args: AddFollowerProp) => {
  if (!args.uid) {
    throw "Requires UID";
  }
  try {
    const docRef = await setDoc(
      doc(db, "following", args.uid),
      {
        following: { [args.otherUid]: true },
      },
      { merge: true }
    );
    return docRef;
  } catch (e) {
    alert(e);
  }
};

export const onFollow = async (args: AddFollowerProp) => {
  try {
    await addFollower({ uid: args.uid, otherUid: args.otherUid });
    await addFollowing({ uid: args.uid, otherUid: args.uid });
  } catch (e) {
    alert(e);
  }
};

export const onUnfollow = async (args: AddFollowerProp) => {
  const followerRef = doc(db, "followers", args.otherUid);
  try {
    const followingRef = doc(db, "following", args.uid);
    await setDoc(
      followerRef,
      {
        followers: { [args.uid]: deleteField() },
      },
      { merge: true }
    );
    await setDoc(
      followingRef,
      {
        following: { [args.otherUid]: deleteField() },
      },
      { merge: true }
    );
  } catch (e) {
    alert(e);
  }
};

interface IFollowers {
  followers: { [key: string]: boolean };
}

interface IFollowing {
  following: { [key: string]: boolean };
}
export const getFollowers = async (uid: string) => {
  const docRef = doc(db, "followers", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data() } as IFollowers;
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  } catch (e) {
    alert(e);
  }
};
export const getFollowing = async (uid: string) => {
  const docRef = doc(db, "following", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data() } as IFollowing;
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  } catch (e) {
    alert(e);
  }
};

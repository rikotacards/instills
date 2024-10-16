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
  followingUid: string;
}
export const addFollower = async (args: AddFollowerProp) => {
  if (!args.uid) {
    throw "Requires UID";
  }
  try {
    const docRef = await setDoc(
      doc(db, "followers", args.uid),
      {
        followers: { [args.followingUid]: true },
      },
      { merge: true }
    );
    return docRef;
  } catch (e) {
    alert(e);
  }
};

export const addFollowedBy = async (args: AddFollowerProp) => {
  if (!args.uid) {
    throw "Requires UID";
  }
  try {
    const docRef = await setDoc(
      doc(db, "followedBy", args.followingUid),
      {
        followedBy: { [args.uid]: true },
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
    await addFollower({ uid: args.uid, followingUid: args.followingUid });
    await addFollowedBy({ uid: args.followingUid, followingUid: args.uid });
  } catch (e) {
    alert(e);
  }
};

export const removeFollower = async (args: AddFollowerProp) => {
  const ref = doc(db, "followers", args.uid);
  try {
    const followedByRef = doc(db, "followedBy", args.followingUid);
    await updateDoc(ref, {
      [args.followingUid]: deleteField(),
    });
    await updateDoc(followedByRef, {
      [args.uid]: deleteField(),
    });
  } catch (e) {
    alert(e);
  }
};

interface IFollowers {
    followers: {[key: string]: string}
}
export const getFollowers = async(uid: string) => {
    const docRef = doc(db, "followers", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data() } as IFollowers
    } else {
      // docSnap.data() will be undefined in this case
     return undefined
    }
  } catch (e) {
    alert(e);
  }
}
export const getFollowedBy = async(uid: string) => {
    const docRef = doc(db, "followedBy", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data() } as IFollowers
    } else {
      // docSnap.data() will be undefined in this case
     return undefined
    }
  } catch (e) {
    alert(e);
  }
}


import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/firestore";

export async function signupUser({ email, password, fullName }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    fullName,
    role: "user",
    onboardingCompleted: false,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });

  await sendEmailVerification(user);

  return user;
}

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let _app: ReturnType<typeof initializeApp> | null = null;

export function isFirebaseConfigured() {
  return (
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.authDomain &&
    !!firebaseConfig.projectId &&
    !!firebaseConfig.appId
  );
}

export function getFirebaseApp() {
  if (_app) return _app;
  if (!isFirebaseConfigured()) {
    // Don't crash the entire app when env vars are missing.
    // Pages that require Firebase should show a fallback UI instead.
    // (This function is still expected to throw if a Firebase-only action is attempted.)
    console.warn(
      "Firebase not configured. Fill NEXT_PUBLIC_FIREBASE_* in .env.local and restart."
    );
    throw new Error("Firebase not configured");
  }
  _app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  return _app;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirestoreDb() {
  return getFirestore(getFirebaseApp());
}

export function tryGetFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  try {
    return getFirebaseAuth();
  } catch {
    return null;
  }
}

export function tryGetFirestoreDb() {
  if (!isFirebaseConfigured()) return null;
  try {
    return getFirestoreDb();
  } catch {
    return null;
  }
}


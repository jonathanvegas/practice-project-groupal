import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

initializeApp({
  credential: cert(credentials),
});

export function dbconnect(){
  if (!getApps().length) {
    initializeApp({
      credential:cert(credentials)
    });
  }
  return getFirestore();
}
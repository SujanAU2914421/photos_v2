import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBwg6Ic9g5xBZID44VVym4o-BqRVzdpxoM",
	authDomain: "sujanl23.firebaseapp.com",
	projectId: "sujanl23",
	storageBucket: "sujanl23.appspot.com",
	messagingSenderId: "201266289231",
	appId: "1:201266289231:web:49eed2fd8a36376764e83a",
	measurementId: "G-11ERYE594H",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const __storage = getStorage(app);

export { db, __storage };

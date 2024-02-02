import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDSeVU7RwkmiXbMpXp_ivyOc3inB-OzTAM",
    authDomain: "ip-tracker-744a2.firebaseapp.com",
    projectId: "ip-tracker-744a2",
    storageBucket: "ip-tracker-744a2.appspot.com",
    messagingSenderId: "285035154861",
    appId: "1:285035154861:web:d9bd1a4ceb6099b1cc6524"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

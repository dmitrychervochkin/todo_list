import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDcXJISgYokapJcapq737upth4sTkViPVo',
	authDomain: 'todolist-14630.firebaseapp.com',
	projectId: 'todolist-14630',
	storageBucket: 'todolist-14630.appspot.com',
	messagingSenderId: '770165834593',
	appId: '1:770165834593:web:08b6628ff8378b4525fb20',
	databaseURL: 'https://todolist-14630-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

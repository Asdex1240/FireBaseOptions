import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData, collectionData } from '@angular/fire/firestore';
import { setDoc, collection, deleteDoc} from 'firebase/firestore';
import { Register } from '../models/user.model';
 
@Injectable({
 providedIn: 'root'
})
export class FirebaseService {
 
  constructor
  (   
    private auth: Auth,
    private firestore: Firestore
  ) { }
 
  getInfoUser(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }
 
  uploadUser(path: string ,profile: Register){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `${path}/${user.uid}`);
    return setDoc(userDocRef, profile);
  }
 
  getCollection(path: string){
    const coll = collection(this.firestore, path);
    return collectionData(coll);
  }
 
  deleteDocument(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }
}

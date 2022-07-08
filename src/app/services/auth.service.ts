import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Login } from '../models/user.model';
 
@Injectable({
 providedIn: 'root'
})
export class AuthService {
 
 constructor(private auth: Auth) { }
 
 async register(data: Login){
   try{
     const user = await createUserWithEmailAndPassword(
       this.auth,
       data.email,
       data.password
     );
     return user;
   } catch(error){
     console.log(error);
     return null;
   }
 }
 
 async login({email, password}){
   try{
     const user = await signInWithEmailAndPassword(
       this.auth,
       email,
       password
     );
     return user;
   } catch(error){
     console.log(error);
     return null;
   }
 }
 
 logout() {
   return signOut(this.auth);
 }
}


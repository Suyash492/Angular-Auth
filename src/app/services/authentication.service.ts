import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from,Observable, switchMap } from 'rxjs';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor( private auth: Auth) { }

login(username: string, password: string){
  return from(signInWithEmailAndPassword(this.auth,username,password));
}

signUp(name:string, email: string, password: string){
  return from(createUserWithEmailAndPassword(this.auth, email, password,)).pipe(switchMap(({ user}) => updateProfile(user,{displayName: null})));
}
logout(): Observable<any> {
  return from(this.auth.signOut());
}

}

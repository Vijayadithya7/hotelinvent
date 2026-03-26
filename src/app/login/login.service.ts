import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isloggedIn:boolean= false;
  isAdmin:boolean = false;
  constructor() { }
  login(email:string,password:string){
    if(email === 'Admin@gmail.com' && password === 'Admin'){
      this.isloggedIn = true;
      this.isAdmin = true;
    }
    if(email === 'user@gmail.com' && password === 'user'){
      this.isloggedIn = true;
      this.isAdmin = false;
    }

  return this.isloggedIn;
  }
}

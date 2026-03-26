import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate, CanLoad {
  static canActivate(arg0: ActivatedRouteSnapshot | RouterStateSnapshot): any {
    throw new Error('Method not implemented.');
  }

  constructor(private loginService:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Add logic here to check if the user can activate the route
    return this.loginService.isloggedIn?true:this.router.navigate(['/login']);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // Add logic here to check if the user can load the route
    return this.loginService.isloggedIn;
  }
}

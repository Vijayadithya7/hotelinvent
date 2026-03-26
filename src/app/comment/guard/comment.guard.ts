import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Comments } from '../comment';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures this resolver is available app-wide
})

export class commentGuard implements Resolve<Comments[]>{
  constructor(private commentService:CommentService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comments[]> | Promise<Comments[]> | Comments[]{
    return this.commentService.getComments();
  }
  
}

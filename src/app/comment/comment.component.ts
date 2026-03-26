import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Observable, pluck } from 'rxjs';
import { Comments } from './comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'] // Corrected property name
})
export class CommentComponent implements OnInit {
  comments$!: Observable<Comments[]>; // Declare the property with comment interface
  comment$!:Observable<Comments[]>;
  comments:Comments[] = [];
  constructor(private commentService: CommentService,private activatedRoute:ActivatedRoute) {} // Updated variable name

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments(); // Use `this` to refer to the class property
    this.activatedRoute.data.subscribe(data => this.comments = data['comments']);
    this.comment$! = this.activatedRoute.data.pipe(pluck('comments'));
  }
}


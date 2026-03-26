import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This allows the service to be available globally without needing to explicitly provide it in the module.
})

  export class InitService {
  
    config:any;
    constructor(private http:HttpClient) { }
  
    init(): Observable<any> {
      return this.http.get('/assets/config.json').pipe(
        tap((config) => {
          this.config = config;  // Set the config property
        }),
        catchError((err) => {
          console.error('Error loading configuration', err);
          // Return an empty array or a default configuration if there's an error
          return of([]);
        })
      );
    }
  }
  


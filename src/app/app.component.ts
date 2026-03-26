import {  Component, ElementRef, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './rooms/services/logger.service';
import { Inject } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template:  `
  // <h1>This is Angular Project </h1>`,
  styleUrls: ['./app.component.scss'] 
  // styles: [`h1{color:blue;}`]
})
export class AppComponent implements OnInit{
  title = 'hotelapp';

  @ViewChild('name', {static:true}) name! : ElementRef;
  // @ViewChild('user', { read: ViewContainerRef} ) vcr! : ViewContainerRef; 

  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberofRooms = 50;
  // }
    constructor(@Optional() private loggerservice:LoggerService,
    @Inject(LocalStorageToken) 
    private localstorage:Storage,
    private initservice:InitService,
    private configservice:ConfigService,
    private router:Router
){}
  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // })
      // this.name.nativeElement.innerText = 'Hilton Hotel';
      this.router.events.pipe(
        filter((event) => event instanceof NavigationStart)).subscribe((event) => {
          console.log('Navigation Started');
        })
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
          console.log('Navigation Completed');
        })
      
      this.loggerservice.log('Appcomponent.ngonInit()');
      this.localstorage.setItem('name','Hilton Hotel');
      console.log(this.initservice.config);
  }
  role = 'Admin';
  
}

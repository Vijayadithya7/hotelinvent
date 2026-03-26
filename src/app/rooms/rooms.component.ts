import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { RoomList, Rooms } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEventType } from '@angular/common/http';
import { catchError, map, of, Subject, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'] 
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked,OnDestroy{
  
hotelName = 'Hilton Hotel';
numberofRooms = 10;
hideRooms = true;

selectedRoom!:RoomList;

rooms:Rooms = {
  totalRooms:20,
  availableRooms:10,
  bookedRooms:5
}

stream = new Observable(observer => {
  observer.next('user1');
  observer.next('user2');
  observer.next('user3');
  observer.complete();
})


priceFilter = new FormControl(0);

title = 'Room List'

roomlist:RoomList[] = [];

rooms$!:Observable<RoomList[]>;

subscription!:Subscription;

error$ = new Subject<string>;

geterror$ = this.error$.asObservable();

roomscount$!:Observable<Number>;



@ViewChild(HeaderComponent) headerComponent! : HeaderComponent;

@ViewChildren(HeaderComponent) headerChildrenComponent! : QueryList<HeaderComponent>;
  totalbytes: number = 0;

  

  constructor(@SkipSelf() private roomsservices:RoomsService,private configservice:ConfigService){


    this.rooms$ = this.roomsservices.getRooms$.pipe(
      catchError( (err) => {
        // console.log(err);
        this.error$.next(err.message);
        return of([]);
      }))
      this.roomscount$ = this.roomsservices.getRooms$.pipe(
        map((rooms) => rooms.length)
      );
  }
  
  ngAfterViewChecked(): void {
    
  }
  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = 'Last Title';
    
  }
  ngDoCheck(): void {
    console.log('On changes is called');
  }
  ngOnDestroy(){
    if(this.subscription)
    {
    this.subscription.unsubscribe();
    }
    }


  ngOnInit(): void {
    this.roomsservices.getPhotos().subscribe(
      (event) => {
        switch(event.type){
          case HttpEventType.Sent:{
            console.log('Request has been sent');
            break;
          }
          case HttpEventType.ResponseHeader:{
            console.log('Request Success');
            break;
          }
          case HttpEventType.DownloadProgress:{
            this.totalbytes += event.loaded;
            break;
          }
          case HttpEventType.Response:{
            console.log(event.body);
            
          }
        }
      }
    );

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: (err) => console.log(err)
    })
    // this.stream.subscribe((data) => console.log(data));
    // this.subscription = this.roomsservices.getrooms$.subscribe(room => {
    //   this.roomlist = room;
    // });
  }
  
  toggle(){
    this.hideRooms = !this.hideRooms;
    this.title ='Rooms List';
  }

  selectRoom(room: RoomList){
      this.selectedRoom = room;
  }
  addroom(){
    const room:RoomList = {
      roomNumber:'',
      roomType:'Private Suite',
      amenities:'Air Conditioning,Free wifi,tv,Bathroom,Kitchen,Free Food',
      price:1250,
      photos: 'abcd',
      checkinTime:new Date('11-03-2022'),
      checkoutTime:new Date('12-03-2022'),
      rating:4.5
    }
    // this.roomlist = [...this.roomlist, room];
    this.roomsservices.addRoom(room).subscribe((data) => {
      this.roomlist = data;
    })
  }
  editroom(){
    const room:RoomList = {
      roomNumber:'3',
      roomType:'Private Suite',
      amenities:'Air Conditioning,Free wifi,tv,Bathroom,Kitchen,Free Food',
      price:1250,
      photos:'abcd',
      checkinTime:new Date('11-03-2022'),
      checkoutTime:new Date('12-03-2022'),
      rating:4.5
    }
    // this.roomlist = [...this.roomlist, room];
    this.roomsservices.editRoom(room).subscribe((data) => {
      this.roomlist = data;
    })
  }
  deleteroom(){
    this.roomsservices.delete('').subscribe((data) => {
      this.roomlist = data;
    })
  }
  
  }


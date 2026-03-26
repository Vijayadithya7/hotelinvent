import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent implements OnInit{

  room:RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  }

  successmessage:string='';
  constructor(private roomsService:RoomsService){}

  ngOnInit(): any { 
  }
  Addroom(roomsForm:NgForm){
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successmessage = 'Rooms Added Successfully'
    roomsForm.resetForm(
      {
        roomType: '',
        amenities: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      }
    );
    }
    )
  }

}

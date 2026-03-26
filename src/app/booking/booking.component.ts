import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormControl,FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  bookingForm!:FormGroup;

  get guests(){
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(private configservice:ConfigService,
    private fb:FormBuilder,
    private bookingService:BookingService,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value:roomId,disabled:true},{validators:[Validators.required]}),
      guestEmail: ['',{
        updateOn:'blur',
        validators:[Validators.required,Validators.email]
      }
    ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['',
      {
        updateOn:'blur'
      }
    ],
      guestName: ['',[Validators.required,
        Validators.minLength(5),
        CustomValidator.validateName,
      CustomValidator.validateSpecialchar('*')]],
      address:this.fb.group({
      Addressline1: ['',[Validators.required]],
      Addressline2: [''],
      City: [''],
      State: [''],
      Country: [''],
      ZipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc:new FormControl(false,{validators:[Validators.requiredTrue]})
    },
    {
      updateOn:'blur',validators:[CustomValidator.validateDate]
    }
);
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {})
    // })
   
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe(data => console.log(data))
  }
  addBooking(){
    console.log(this.bookingForm.getRawValue());
    
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {console.log(data)});
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address:{
      Addressline1: '',
      Addressline2: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: '',
      },
      guests: [],
      tnc:false
    })
  }
  addGuests(){
    this.guests.push(
      this.addGuestControl()
    )
  }
  addGuestControl(){
    return this.fb.group({
      guestName:['',[Validators.required]],
      age: new FormControl('')
    })
  }
  addPassport(){
    this.bookingForm.addControl('passport',new FormControl(''));
  }
  deletePassport(){
    this.bookingForm.removeControl('passport');
  }
  removeGuests(i:number){
    this.guests.removeAt(i);
  }
  getBookingData(){
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('20-Feb-2024'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address:{
      Addressline1: '',
      Addressline2: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: '',
      },
      guests: [],
      tnc:false
    })
  }
}

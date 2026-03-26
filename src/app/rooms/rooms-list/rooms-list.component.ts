import { ChangeDetectionStrategy, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit,OnChanges, OnDestroy{

  @Input() rooms:RoomList[] = [];

  @Input() title:string = ' ';

  @Input() price = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();
  
  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      if(changes['title']){
        this.title = changes['title'].currentValue.toUpperCase();
      }
  }
  ngOnInit(): void {
  }
  
  selectRoom(room: RoomList){
    this.selectedRoom.emit(room)
  }
  ngOnDestroy(): void {
    console.log('On Destroy is initiated');
  }
}

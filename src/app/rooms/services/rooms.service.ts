import { Inject, Injectable, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Appconfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, shareReplay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  

roomlist:RoomList[] = []; 
getRooms$! : Observable<RoomList[]>
// headers = new HttpHeaders({ 'token' : '123456klio'});


  constructor(@Inject(APP_SERVICE_CONFIG) private config:Appconfig,private http:HttpClient) { 
    console.log(this.config.apiEndpoint);
    console.log('Rooms service is intiated');
    
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
      shareReplay(1)
    )
    // this.getRooms$.pipe(tap(rooms => console.log(rooms))).subscribe();
  }
  
  
getrooms(){
  return this.http.get<RoomList[]>('/api/rooms');
} 
addRoom(room:RoomList){
  return this.http.post<RoomList[]>('/api/rooms',room);
}
editRoom(room:RoomList){
  return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
}
delete(id:string){
  return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
}
getPhotos() {
  const request = new HttpRequest('GET',`https://jsonplaceholder.typicode.com/photos`,
    {
      reportProgress:true
    }
  )
  return this.http.request(request);
}

}

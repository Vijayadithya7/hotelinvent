import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { RoomsService } from './services/rooms.service';
import { ConfigService } from '../services/config.service';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteconfigToken } from '../services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RoomsComponent],
      providers:[RoomsService,ConfigService,
      {
        provide:APP_SERVICE_CONFIG,
        useValue:{apiEndpoint : "http://localhost:3000"
        }
      },
      {
        provide: RouteconfigToken,
        useValue: { title : 'rooms'}
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle',() => {
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true);
  })
});

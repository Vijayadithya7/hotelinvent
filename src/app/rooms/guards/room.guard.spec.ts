import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';
import { RoomGuard } from './room.guard'; // Import the RoomGuard
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule if the guard depends on routing
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // Import necessary types

describe('RoomGuard', () => {
  let roomGuard: RoomGuard;

  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roomGuard.canActivateChild(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule if necessary
      providers: [RoomGuard] // Provide the RoomGuard
    });
    roomGuard = TestBed.inject(RoomGuard); // Inject the guard
  });

  it('should be created', () => {
    expect(roomGuard).toBeTruthy();
  });

  // Additional test for guard logic
  it('should return true for canActivateChild', () => {
    const mockRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;
    expect(roomGuard.canActivateChild(mockRouteSnapshot, mockRouterStateSnapshot)).toBe(true); // Modify based on actual guard logic
  });
});


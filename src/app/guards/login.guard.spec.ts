import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { LoginGuard } from './login.guard'; // Import the class-based loginGuard
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginGuard', () => {
  let loginGuard: LoginGuard;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      providers: [
        LoginGuard, // Provide the guard class
        // Mock any additional services that LoginGuard might depend on
      ]
    });

    loginGuard = TestBed.inject(LoginGuard); // Inject the LoginGuard
    mockRouter = TestBed.inject(Router); // Mock Router if used in the guard
    mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    mockRouterStateSnapshot = {} as RouterStateSnapshot;
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  // Test the guard's canActivate method
  it('should return true for canActivate', () => {
    const result = loginGuard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(true); // Adjust this based on the actual guard logic
  });

  // You can add more tests to handle different cases, such as false return, redirection, etc.
});

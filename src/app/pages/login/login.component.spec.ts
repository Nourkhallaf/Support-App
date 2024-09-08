import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(true)
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate the form correctly', () => {
    const usernameInput = component.loginForm.controls['username'];
    const passwordInput = component.loginForm.controls['password'];

    usernameInput.setValue('admin');
    passwordInput.setValue('password');
    
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login method on submit', () => {
    const usernameInput = component.loginForm.controls['username'];
    const passwordInput = component.loginForm.controls['password'];

    usernameInput.setValue('admin');
    passwordInput.setValue('password');

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('admin', 'password');
  });

  it('should navigate to /requests on successful login', () => {
    const usernameInput = component.loginForm.controls['username'];
    const passwordInput = component.loginForm.controls['password'];

    usernameInput.setValue('admin');
    passwordInput.setValue('password');

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/requests']);
  });

  it('should display an error message for invalid login', () => {
    // Mock the login method to return false to simulate invalid login
    authService.login = jasmine.createSpy('login').and.returnValue(false); 

    const usernameInput = component.loginForm.controls['username'];
    const passwordInput = component.loginForm.controls['password'];

    usernameInput.setValue('wronguser');
    passwordInput.setValue('wrongpassword');

    // Submit the form with invalid credentials
    component.onSubmit();

    // Trigger change detection to update the DOM with the error message
    fixture.detectChanges();

    // Check if the error message is displayed
    const errorMsg = fixture.debugElement.query(By.css('.alert-danger'));

    expect(errorMsg).toBeTruthy(); // Ensure the error message exists
    expect(errorMsg.nativeElement.textContent).toContain('Invalid username or password.');
  });
});

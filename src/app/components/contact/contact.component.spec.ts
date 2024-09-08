import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactComponent } from './contact.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { of } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    const contactServiceMock = {
      submitForm: jasmine.createSpy('submitForm').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule  // <-- Ensure this is imported
      ],
      declarations: [ContactComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    fixture.detectChanges();
  });

  it('should create the contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.contactForm.valid).toBeFalse();
  });

  it('should validate form inputs correctly', () => {
    const nameInput = component.contactForm.controls['name'];
    const emailInput = component.contactForm.controls['email'];
    const phoneInput = component.contactForm.controls['phone'];
    const contentInput = component.contactForm.controls['content'];
    const captchaInput = component.contactForm.controls['captcha'];

    nameInput.setValue('John Doe');
    emailInput.setValue('john@example.com');
    phoneInput.setValue('01234567890');
    contentInput.setValue('Some request content.');
    captchaInput.setValue('mock-captcha-value'); // Simulate reCAPTCHA

    expect(component.contactForm.valid).toBeTrue();
  });

  it('should call submitForm on valid form submission', () => {
    const nameInput = component.contactForm.controls['name'];
    const emailInput = component.contactForm.controls['email'];
    const phoneInput = component.contactForm.controls['phone'];
    const contentInput = component.contactForm.controls['content'];
    const captchaInput = component.contactForm.controls['captcha'];

    nameInput.setValue('John Doe');
    emailInput.setValue('john@example.com');
    phoneInput.setValue('01234567890');
    contentInput.setValue('Some request content.');
    captchaInput.setValue('mock-captcha-value'); // Simulate reCAPTCHA value

    component.onSubmit();

    expect(contactService.submitForm).toHaveBeenCalled();
  });
});

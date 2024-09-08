import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmittedSuccessfully = false;
  submitted = false;
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,  Validators.pattern(this.emailPattern)]],
      phone: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11), Validators.maxLength(11)]],
      content: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true; 

    console.log(this.contactForm)
    if (this.contactForm.valid) {
      const contactData = {
        ...this.contactForm.value,
        id: Math.floor(Math.random() * 1000),
        status: 'submitted',
        createdDate: new Date().toISOString() 
      };

      this.contactService.submitForm(contactData);

      this.contactForm.reset();
      this.submitted = false; 
      this.formSubmittedSuccessfully = true;
    }
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get content() {
    return this.contactForm.get('content');
  }

  get captcha() {
    return this.contactForm.get('captcha');
  }


  onCaptchaResolved(captchaResponse: string) {
    console.log(captchaResponse);
    if (captchaResponse) {
      this.captcha?.setValue(captchaResponse); 
      this.captcha?.setErrors(null);
      this.captcha?.updateValueAndValidity();

    } else {
      this.captcha?.setErrors({ required: true });
      this.captcha?.updateValueAndValidity();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage!: string;
  errorCode: string | null = null;
  errorImage!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.errorCode = params.get('code');
      if (this.errorCode) {
        this.setErrorMessage();
        this.setErrorImage();
      }
    });
  }

  setErrorMessage(): void {
    switch (this.errorCode) {
      case '404':
        this.errorMessage = '404 - Page Not Found';
        break;
      case '403':
        this.errorMessage = '403 - Unauthorized Access';
        break;
      case '500':
        this.errorMessage = '500 - Internal Server Error';
        break;
      default:
        this.errorMessage = 'An unexpected error occurred.';
        break;
    }
  }

  setErrorImage(): void {
    this.errorImage = `assets/error/${this.errorCode}.png`; 
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
    requestId!: number;
    requestDetails!: Contact ; 

    constructor(private route: ActivatedRoute,  
      private router: Router,
      private contactService: ContactService
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.requestId = +id;  
        this.loadRequestDetails();
      } else {
        this.router.navigate(['/error', { code: 404 }]);  
      }
    }

    loadRequestDetails(): void {
      this.contactService.getRequestById(this.requestId).subscribe(
        request => {
          if (request) {
            this.requestDetails = request;
          } else {
            this.router.navigate(['/error', { code: 404 }]); 

          }
        },
        error => {
          error = error.message;
          console.log(error);
          this.router.navigate(['/error', { code: 404 }]); 
        }
      );
    }
    

    markAsResolved(): void {
      if (this.requestDetails) {
        this.requestDetails.status = 'resolved';
      }
    }

    markAsNotApplicable(): void {
      if (this.requestDetails) {
        this.requestDetails.status = 'not-applicable';
      }
    }
}

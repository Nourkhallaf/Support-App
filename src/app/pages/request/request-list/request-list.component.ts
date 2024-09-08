import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests: Contact[] = [];
  sortedRequests: Contact[] = []; 

  constructor(private contactService: ContactService, private router: Router) {}
  
  ngOnInit(): void {
    this.contactService.requests$.subscribe(data => {
      this.requests = data;
      this.sortedRequests = [...this.requests];  
    });
  }

  requestDetails(requestId: number): void {
    this.router.navigate(['/request', requestId]);
  }

  onSortChange(event: Event): void {

    const target = event.target as HTMLSelectElement; 
    const sortBy = target.value;  

    console.log(event); 
    console.log(sortBy)
    if (sortBy === 'createdDate') {
      this.sortedRequests = this.sortByDate(this.requests);
    } else if (sortBy === 'status') {
      this.sortedRequests = this.sortByStatus(this.requests);
    } else {
      this.sortedRequests = [...this.requests];  
    }

  }

  sortByDate(requests: Contact[]): Contact[] {
    return [...requests].sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return dateA - dateB;
    });
  }

  sortByStatus(requests: Contact[]): Contact[] {
    const statusOrder = {
      'submitted': 1,
      'resolved': 2,
      'not-applicable': 3
    };
    return [...requests].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }
}

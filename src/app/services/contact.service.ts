import { Injectable } from '@angular/core';
import { MOCK_CONTACT_REQUESTS } from '../mock-data/mock-requests';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private requestsSubject = new BehaviorSubject<Contact[]>(MOCK_CONTACT_REQUESTS);
  requests$ = this.requestsSubject.asObservable();

  getRequestById(id: number): Observable<Contact | undefined> {
    return this.requests$.pipe(
      map(requests => requests.find(request => request.id === id))
    );
  }

  submitForm(newRequest: Contact) {
    const currentRequests = this.requestsSubject.value;
    const updatedRequests = [...currentRequests, newRequest];
    this.requestsSubject.next(updatedRequests);  
  }
}

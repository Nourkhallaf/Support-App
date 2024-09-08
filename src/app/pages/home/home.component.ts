import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  items = ['Support Request 1', 'Support Request 2', 'Product Inquiry', 'Billing Issue']; 
  searchResults: string[] = [];

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this.searchResults = this.items.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
}

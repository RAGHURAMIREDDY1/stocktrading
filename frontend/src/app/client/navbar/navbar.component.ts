import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor() {
    // Check if the user is logged in
    this.isLoggedIn = localStorage.getItem('jwtToken') !== null;
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    alert('Logged out successfully');
    // Update the isLoggedIn flag
    this.isLoggedIn = false;
  }
}

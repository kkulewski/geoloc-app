import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  get isUserLogged() {
    return localStorage.getItem('user_name');
  }

  get username(): string {
    return localStorage.getItem('user_name');
  }

  logoutUser() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}

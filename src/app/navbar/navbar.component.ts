import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
    router.events.subscribe(event => this.isNavbarCollapsed = true);
  }

  isNavbarCollapsed = true;

  username() {
    return localStorage.getItem('user_name');
  }

  ngOnInit() {
  }

}

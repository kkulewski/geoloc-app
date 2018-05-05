import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  get isUserLogged() {
    return this.username;
  }

  get username(): string {
    return this.storageService.userName;
  }

  logoutUser() {
    this.storageService.clear();
    this.router.navigateByUrl('/');
  }

  ngOnInit() { }
}

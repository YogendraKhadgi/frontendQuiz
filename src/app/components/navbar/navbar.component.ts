import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  isLoggedIn = false;
  user = null;
  constructor(public login: LoginService, private router: Router){}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any)=>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }


  public logout(){
    this.login.logout();
    // window.location.reload();
    this.login.loginStatusSubject.next(false);
    this.router.navigate(['login'])
  }
}

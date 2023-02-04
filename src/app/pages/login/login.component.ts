import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) {}
  ngOnInit(): void {}
  formSubmit() {
    console.log('form submit is working!!');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required', '', { duration: 3000 });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', '', { duration: 3000 });
      return;
    }
    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success!');
        console.log(data);

        // login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any)=>{

          this.login.setUser(user);
          console.log(user);

          // redirect user to admin-dashboard or normal-dashboard according to the role
          if (this.login.getUserRole() == 'ADMIN') {
            // admin dashboard
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          }else if (this.login.getUserRole() == 'NORMAL') {
            // user dashboard
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);

          } else {
           this.login.logout();
          //  window.location.reload();
          }
        })
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid credentials !', '', {duration : 3000});
      }
    );
  }
}

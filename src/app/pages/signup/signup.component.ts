import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : ''
  };

  ngOnInit(): void {}

  formSubmit() {
    if(this.user.username == '' || this.user.username == null){
      this.snack.open("username field cannot be empty", "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }else{


      this.userService.addUser(this.user).subscribe(
        (data)=>{
          console.log(this.user);
          Swal.fire('Success', 'user is registered', 'success');
        },
        (err)=>{
          console.log(err);
          Swal.fire('Error!', 'User already exists in Database', 'error');

        }
      )
    }


  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories;
  constructor(private _cat: CategoryService, private _snack: MatSnackBar){}

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
    },(error)=>{
      this._snack.open('Error loading categories!', '', {duration: 3000});
    });
  }

}

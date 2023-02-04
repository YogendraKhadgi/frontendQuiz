import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService){}

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log("load all the quiz");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes = data;
          console.log(this.quizzes);
        },(error)=>{
          console.log(error);
          alert('Error loading quizzes')
        });
      }else{
        console.log("load specific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes = data;
        },(error)=>{
          alert('Error loading data !');
        });
      }

    });

  }

}

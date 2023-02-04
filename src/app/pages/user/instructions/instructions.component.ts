import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid;
  quiz;


  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router: Router){}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.quiz = data;

    },(error)=>{
      console.log(error);
      alert('Error loading quiz data');

    });
  }

  startQuiz(){
    this._router.navigate(['/start/'+ this.qid]);
  }

}

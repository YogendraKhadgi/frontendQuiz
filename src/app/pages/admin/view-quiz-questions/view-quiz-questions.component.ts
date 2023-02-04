import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      this.questions = data;
      console.log(this.questions);
    },(error)=>{
      console.log(error);

    });
  }

  deleteQuestion(qid){
    Swal.fire({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure! do you want to delete this question?'
    }).then((result)=>{
      if (result.isConfirmed) {
      this._question.deleteQuestion(qid).subscribe((data:any)=>{
        this._snack.open('Question deleted successfully', '', {
          duration: 3000
        });
      },(error)=>{
        this._snack.open('Error while deleting ', '', {
          duration: 3000
        });
        console.log(error);

      });

      }
    });
  }

}

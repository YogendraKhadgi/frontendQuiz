import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router){}

  qId = 0;
  quiz;
  categories;

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe((data)=>{
      this.quiz= data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(error);
    });

    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
    },
    (error)=>{
      alert('Error loading data');
      console.log(error);
      ;
    });
  }

  public updateData(){
    if ((this.quiz.title.trim() == '' || this.quiz.title == null)
      ||(this.quiz.description.trim()==''|| this.quiz.description==null)
      ||(this.quiz.maxMarks== null)||(this.quiz.numberOfQuestions == null)) {
        Swal.fire('Warning!', 'Required fields cannot be empty','warning')
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('Success!!', 'Successfully updated quiz', 'success').then((e)=>{
        this._router.navigate(['admin/quizzes'])
      });
    },
    (error)=>{
      Swal.fire('Error!!', 'Error updating quiz', 'error');
      console.log(error);


    });
  }

}

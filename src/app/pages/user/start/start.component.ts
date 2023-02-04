import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _ques: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._ques.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);

        this.timer = this.questions.length * 1 * 60;

        this.startTimer();
      },
      (error) => {
        alert('Error loading data!');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure, you want to submit?',
      confirmButtonText: 'Yes',
      showDenyButton: true,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz                     ();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this._ques.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.correctAnswers = data.correctAnswers;
      this.marksGot = data.marksGot;
      this.attempted = data.attempted;
      this.isSubmit = true;

    },(error)=>{
      console.log(error);


    });

    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.userAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let pointForSingleQuestion =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += pointForSingleQuestion;
    //   }
    //   if (q.userAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });

    // console.log('You attempted : ' + this.attempted + ' questions.');
    // console.log('Correct Answers : ' + this.correctAnswers);
    // console.log("Total points you've got : " + this.marksGot);
  }
  printResult(){
    window.print();
  }
}

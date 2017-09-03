import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
 
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : Feedback;

  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  displayFeedback: boolean = false;

  errMess : string;

  validationMessages ={
    'firstname' : {
      'required':'First name is required',
      'minlength':'First name must be at least 2 characters long',
      'maxlength':'First name cannot be more than 25 characters',
    },

    'lastname' : {
      'required':'Last name is required',
      'minlength':'Last name must be at least 2 characters long',
      'maxlength':'Last name cannot be more than 25 characters',
    },

    'telnum' : {
      'required':'Telephone number is required',
      'pattern':'Telphone number must contain only numbers',
    },

    'email' : {
      'required':'Email is required',
      'email':'Email is not in valid format',
    }

  }

  constructor(private fb : FormBuilder,
     @Inject('BaseURL') private BaseURL, private feedbackservice: FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum : [0, [Validators.required, Validators.pattern]],
      email : ['', [Validators.required,Validators.email]],
      agree : false,
      contacttype : 'None',
      message : '',
    })
    this.feedbackForm.valueChanges
      .subscribe(data=>this.onValueChanged(data))

    this.onValueChanged(); //re(set) form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
       // clear previous error message (if any)
      const control = form.get(field);
      if (control && control.dirty && !control.valid ) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(){
    this.displayFeedback=true;
    this.feedback = this.feedbackForm.value;
    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(feedback=>{this.feedback=feedback,this.displayFeedback=false,
        setTimeout(()=>{this.feedback=null},5000)},
        errmess => {this.errMess = <any>errmess});
    
    this.feedbackForm.reset({
      firstname : '',
      lastname : '',
      telnum : 0,
      email : '',
      agree : false,
      contacttype : 'None',
      message : '',
    });
  }

}
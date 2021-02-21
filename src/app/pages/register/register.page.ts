import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from '../validators/username.validator';
import { PasswordValidator } from '../validators/password.validator';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    // Double confirm password
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({


      // Validate the username w/ min_len = 5 & max_len = 25
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      
      // Validate the Email address
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))

    });
  }

  validation_messages = {

    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },

      // if username is already taken by others
      { type: 'validUsername', message: 'Your username has already been taken.' }

    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least 1 uppercase, 1 lowercase, and 1 number.' }
    ],

    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],

    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],

    // if we have further terms and conditions that need users to read
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],

  };

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/temp"]);
  }

}
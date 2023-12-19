import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { atLeastOneLetterValidator, atLeastOneNumberValidator, atLeastOneSpecialCharacterValidator, passwordMatchValidator } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-sp-reset-password',
  templateUrl: './sp-reset-password.component.html',
  styleUrls: ['./sp-reset-password.component.css']
})
export class SpResetPasswordComponent {

  constructor(private apiService : ApiserviceService,
    private toast: ToastService,

   ) {}

  updateForm = new FormGroup({
    email: new FormControl(this.getStoredEmail(),Validators.required),
    oldPassword: new FormControl('',Validators.required),
    newPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      atLeastOneLetterValidator(),
      atLeastOneNumberValidator(),
      atLeastOneSpecialCharacterValidator(),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%&*]).{8,}$/),]),
    confirmPassword: new FormControl('', Validators.required),
    }, { validators: passwordMatchValidator });



  getStoredEmail(): string {
    return localStorage.getItem('EMAIL_ID') || '';
  }

  updateSubmitForm() {
    const email = this.updateForm.value.email ?? '';
    const oldPassword = this.updateForm.value.oldPassword ?? '';
    const newPassword = this.updateForm.value.newPassword ?? '';
    const confirmPassword = this.updateForm.value.confirmPassword ?? '';
    const appKey = '';

    this.apiService.servicePersonUpdatePassword(email, oldPassword, newPassword, confirmPassword,appKey).subscribe(
      (response) => {
        console.log(response);
        this.toast.show('Password reset successfully');

      },
      (error) => {
        console.error(error);
        this.toast.show('Password reset failed');
      }
    );
  }

  }

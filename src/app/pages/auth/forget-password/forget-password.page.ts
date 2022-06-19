import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponse, ForgetPasswordData } from 'src/app/models/auth';
import { MenuController } from '@ionic/angular';
import { IonIntlTelInputValidators } from 'ion-intl-tel-input';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  preferredCountries:string[]=['sa','kw','ae','qa','bh','om'];
  currentLanguage: string;
  forgetForm: FormGroup;
  isForgetPasswordSubmitted: boolean = false;

  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private util: UtilitiesService,
    private langaugeservice: LanguageService,
    private auth: AuthService,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'main');
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  forgetPassword() {
    this.isForgetPasswordSubmitted=true;
    this.forgetForm.value.phoneNumber.nationalNumber=this.forgetForm.value.phoneNumber.nationalNumber.replace(/\s/g,'');

    console.log('change pass form : ' + JSON.stringify(this.forgetForm.value));
   // if (this.forgetForm.valid) {
      const forgetPasswordData: ForgetPasswordData = {
        lang: this.langaugeservice.getLanguage(),
        // phone: this.forgetForm.value.phoneNumber,
        phone: this.forgetForm.value.phoneNumber.nationalNumber,
        phone_code:this.forgetForm.value.phoneNumber.dialCode,
      };
      this.util.showLoadingSpinner().then((__) => {
        this.auth.forgetPassword(forgetPasswordData).subscribe(
          (data: AuthResponse) => {
            if (data.key == 1) {
              console.log('forget password res :' + JSON.stringify(data));
              this.util.showMessage(data.msg);
              this.router.navigateByUrl('/change-password/' + data.data.id);
            } else {
              this.util.showMessage(data.msg);
            }
            this.util.dismissLoading();
          },
          (err) => {
            this.util.dismissLoading();
          }
        );
      });
   // }
  }

  get forgetPasswordErrorControl() {
    return this.forgetForm.controls;
  }

  buildForm() {
    this.forgetForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          IonIntlTelInputValidators.phone
          // Validators.pattern(/^05/),
         // Validators.minLength(10),
         // Validators.maxLength(10),
        ],
      ],
    });
  }
}

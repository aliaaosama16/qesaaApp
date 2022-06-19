import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthResponse } from 'src/app/models/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangePasswordData } from 'src/app/models/forgetPassword';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  showChangePass: boolean;
  iconChangeName: string = 'eye-off-outline';
  inputChangeType: any = 'password';
  showChangeConfirmPass: boolean;
  iconChangeConfirmName: string = 'eye-off-outline';
  inputChangeConfirmType: any = 'password';
  currentLanguage: string;
  changePasswordForm: FormGroup;
  ischangePasswordSubmitted:boolean=false;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private util:UtilitiesService,
    private auth:AuthService,
    private router:Router,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'main');
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  changePassword(){
    this.ischangePasswordSubmitted = true;
    console.log(
      'change pass form : ' + JSON.stringify(this.changePasswordForm.value)
    );
    if (this.changePasswordForm.valid) {
      if (
        this.changePasswordForm.value.password ==
        this.changePasswordForm.value.confirmPassword
      ) {
        console.log(
          'user id : ' + this.activatedRoute.snapshot.paramMap.get('userID')
        );
        const changePasswordData :ChangePasswordData= {
          user_id: parseInt(
            this.activatedRoute.snapshot.paramMap.get('userID')
          ),
          code: this.changePasswordForm.value.code,
          password: this.changePasswordForm.value.password,
        };

        this.util.showLoadingSpinner().then((__) => {
          this.auth.changePassword(changePasswordData).subscribe(
            (data: AuthResponse) => {
              if (data.key == 1) {
                console.log('changePassword res :' + JSON.stringify(data));
                this.util.showMessage(data.msg);
                this.router.navigateByUrl('/login');
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
      }
    }
  }


  get changePasswordErrorControl() {
    return this.changePasswordForm.controls;
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      code:['', [Validators.required, Validators.minLength(4)]],
    });
  }

  showChangePassword() {
    this.showChangePass = !this.showChangePass;
    this.iconChangeName = this.showChangePass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputChangeType = this.showChangePass ? 'text' : 'password';
  }

  showChangeConfirmPassword() {
    this.showChangeConfirmPass = !this.showChangeConfirmPass;
    this.iconChangeConfirmName = this.showChangeConfirmPass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputChangeConfirmType = this.showChangeConfirmPass
      ? 'text'
      : 'password';
  }
}

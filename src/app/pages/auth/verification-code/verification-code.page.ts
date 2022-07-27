import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { ActivationData, AuthResponse } from 'src/app/models/auth';
import { DataService } from 'src/app/services/data/data.service';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { UserData } from 'src/app/models/general';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage implements OnInit {
  input1: string;
  input2: string;
  input3: string;
  input4: string;

  @ViewChild('n1') number1;
  // @ViewChild('n1') number2:ElementRef;
  // @ViewChild('n1') number3:ElementRef;
  // @ViewChild('n1') number4:ElementRef;

  inputFocusNumber1: boolean = false;
  inputFocusNumber2: boolean = false;
  inputFocusNumber3: boolean = false;
  inputFocusNumber4: boolean = false;
  codeValues: string;
  code: number;
  activationData: ActivationData;
  currentLanguage: string = '';
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private util: UtilitiesService,
    private language: LanguageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private location: Location
  ) {
    this.menuCtrl.enable(false, 'main');
    this.currentLanguage = this.languaService.getLanguage();
    this.util.getDevice();
  }

  ngOnInit() {
    //this.buildForm();
  }

  confirmVerificationCode() {
    this.codeValues = this.input1 + this.input2 + this.input3 + this.input4;
    this.code = parseInt(this.codeValues);

    this.activationData = {
      lang: this.language.getLanguage(),
      user_id: parseInt(this.activatedRoute.snapshot.paramMap.get('userID')),
      code: parseInt(this.codeValues),
      device_id: this.util.deviceID,
    };

    console.log('code values :' + this.codeValues);
    this.util.showLoadingSpinner().then((__) => {
      this.auth.activeAccount(this.activationData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            console.log('activeAccount  res :' + JSON.stringify(data));
            this.util.showMessage(data.msg);
          //  setTimeout(() => {
             // this.auth.storeStatusAfterLogin(data);
              // this.auth.setUserID(data.data.id);
              // this.auth.storeUserType(data.data.user_type);
              // this.router.navigateByUrl('/tabs');


              if (data.data.is_active && data.data.is_login) {
                this.auth.storeStatusAfterLogin(data);
                this.auth.setUserID(data.data.id);
                this.auth.storeUserType(data.data.user_type);
                if (data?.data?.user_type == 'provider') {
                  this.util.updateProviderLocation();
                }
                this.router.navigateByUrl('/tabs/home');
              }

              
          //  }, 2000);
           
           
          } else {
            this.util.showMessage(data.msg).then(()=>{
              this.codeValues = '';
            });
           
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.codeValues = '';

          this.util.dismissLoading();
        }
      );
    });
  }

  next(ev, nextInput, current) {
    console.log('input value :  ' + ev.target.value, nextInput);

    if (current == 'n1') {
      this.inputFocusNumber1 = true;
    } else if (current == 'n2') {
      this.inputFocusNumber2 = true;
    } else if (current == 'n3') {
      this.inputFocusNumber3 = true;
    } else if (current == 'n4') {
      this.inputFocusNumber4 = true;
    }
    const input = ev.target;
    const length = input.value.length;
    console.log('length is ' + length);
    const maxLength = input.attributes.maxlength.value;
    console.log('maxLength is ' + maxLength);
    //this.codeValues += ev.target.value;
    console.log(this.codeValues);
    if (length >= maxLength) {
      nextInput.setFocus();
    }
  }

  onOtpChange($event) {
    console.log('numbers' + JSON.stringify($event));
  }

  goBack() {
    this.location.back();
  }

  resendCode() {
    const userData: UserData = {
      lang: this.language.getLanguage(),
      user_id: parseInt(this.activatedRoute.snapshot.paramMap.get('userID')),
    };
    this.util.showLoadingSpinner().then((__) => {
      this.auth.resendCode(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg);
            window.location.reload();
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

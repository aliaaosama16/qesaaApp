import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { ActivationData, AuthResponse } from 'src/app/models/auth';
import { DataService } from 'src/app/services/data/data.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage implements OnInit {

  inputFocusNumber1: boolean = false;
  inputFocusNumber2: boolean = false;
  inputFocusNumber3: boolean = false;
  inputFocusNumber4: boolean = false;
  codeValues: string;
  code: number;
  activationData: ActivationData;
  currentLanguage:string='';
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private auth:AuthService,
    private util:UtilitiesService,
    private language:LanguageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'main');
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    //this.buildForm();
  }

  confirmVerificationCode() {
    this.code = parseInt(this.codeValues);
    console.log('code is :' + this.codeValues.substring(9));

    this.activationData = {
      lang: this.language.getLanguage(),
      user_id:parseInt( this.activatedRoute.snapshot.paramMap.get('userID')),
      code: parseInt( this.codeValues.substring(9)),
      device_id: this.util.deviceID,
    };

    this.util.showLoadingSpinner().then((__) => {
      this.auth.activeAccount(this.activationData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            console.log('activeAccount  res :' + JSON.stringify(data));
            this.util.showMessage(data.msg);
           // this.util.showMessage('login now');
           // this.data.setPreviousPage('signin');
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
    this.codeValues += ev.target.value;
    console.log(this.codeValues);
    if (length >= maxLength) {
      nextInput.setFocus();
    }
  }

  onOtpChange($event) {
    console.log('numbers' + JSON.stringify($event));
  }
}

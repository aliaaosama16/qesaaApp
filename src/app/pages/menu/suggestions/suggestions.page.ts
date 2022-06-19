import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactType, ContactUsData } from 'src/app/models/contactUs';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralResponse } from 'src/app/models/general';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

 
  public suggestionsForm: FormGroup;
  currentLanguage: string;
  contactData: ContactUsData;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private general: GeneralService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.suggestionsForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
          //10
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  suggest() {
    console.log('conatct form :' + JSON.stringify(this.suggestionsForm.value));

    this.contactData = {
      lang: this.languageService.getLanguage(),
      name: this.suggestionsForm.value.userName,
      phone: this.suggestionsForm.value.phoneNumber,
      message: this.suggestionsForm.value.message,
      type: ContactType.suggest,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.general.contactUs(this.contactData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
           // this.util.showMessage(data.msg);
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
  inputHaveFocused(inputFocusStatus) {
    this.util.inputStatus(inputFocusStatus);
  }

}

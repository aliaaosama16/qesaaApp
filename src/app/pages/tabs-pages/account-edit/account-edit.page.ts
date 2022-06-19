import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthDataResponse, UserData } from 'src/app/models/general';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthResponse, UpdateUserData } from 'src/app/models/auth';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { GeneralService } from 'src/app/services/general/general.service';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {
  showChangePass: boolean;
  iconChangeName: string = 'eye-off-outline';
  inputChangeType: any = 'password';
  showChangeConfirmPass: boolean;
  iconChangeConfirmName: string = 'eye-off-outline';
  inputChangeConfirmType: any = 'password';
  userDetails: AuthDataResponse;
  currentLanguage: string;
  editProfileForm: FormGroup;
  profileImage: any = '';
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private util: UtilitiesService,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
    private general: GeneralService,
    private uploadImage: UploadImageService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.getUserData();
    this.buildForm();
  }

  getUserData() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.auth.userData(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userDetails = data.data;
            this.profileImage=data.data.avatar;
            console.log('user all data :' + JSON.stringify(this.userDetails));
          } else {
            //  this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
          //this.getData = false;
        }
      );
    });
  }

  buildForm() {
    this.editProfileForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: [''],
      confirmPassword: [''],
    });
  }

  async attachBasicImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    console.log('taken image by camera  :' + this.profileImage);
    await this.uploadImage.getImageConverted(image, 'profile');
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

  editProfile() {
    var profileImage = '';
    profileImage =
      this.general.getProfileImage() == ''
        ? this.userDetails.avatar
        : this.general.getProfileImage();
    const userData: UpdateUserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      first_name: this.editProfileForm.value.userName,
      phone: this.editProfileForm.value.phoneNumber,
      password: this.editProfileForm.value.password,
      avatar: profileImage,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.auth.updateUserData(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userDetails = data.data;
            console.log('user all data :' + JSON.stringify(this.userDetails));
          } else {
            this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
          //this.getData = false;
        }
      );
    });
  }

  inputHaveFocused(inputFocusStatus) {
    this.util.inputStatus(inputFocusStatus);
  }

}

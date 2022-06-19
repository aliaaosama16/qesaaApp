import { CitysData, CitysResponse } from './../../../models/general';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { LanguageService } from './../../../services/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { GeneralService } from 'src/app/services/general/general.service';
import {
  ImageInfo,
  UserData,
  GeneralSectionResponse,
} from 'src/app/models/general';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { DataService } from 'src/app/services/data/data.service';
import { AppData } from 'src/app/models/data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponse, RegisterData } from 'src/app/models/auth';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/userType';
import { TranslateService } from '@ngx-translate/core';
const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-support-productive-families',
  templateUrl: './support-productive-families.page.html',
  styleUrls: ['./support-productive-families.page.scss'],
})
export class SupportProductiveFamiliesPage implements OnInit {
  public productAdditionForm: FormGroup;
  currentLanguage: string;
  basicImage: any = '';
  productImage: any = '';
  cities: GeneralSectionResponse[];
  neighborhoods: GeneralSectionResponse[];
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private langaugeservice:LanguageService,
    private sanitizer: DomSanitizer,
    private router:Router,
    private general: GeneralService,
    private uploadImage: UploadImageService,
    private util: UtilitiesService,
    private dataService: DataService,
    private auth:AuthService,
    private translate:TranslateService
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getLanguage();
    this.buildForm();
    this.getAllCities();
  }

  buildForm() {
    this.productAdditionForm = this.formBuilder.group({
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
      city: ['', [Validators.required, Validators.minLength(2)]],
      neighborhood: ['', [Validators.required, Validators.minLength(2)]],
      twitterLink: ['', [Validators.required, Validators.minLength(2)]],
      instgramLink: ['', [Validators.required, Validators.minLength(2)]],
      basicImage: [
        this.basicImage,
        [Validators.required, Validators.minLength(2)],
      ],
      productImage: [
        this.productImage,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }

  async attachBasicImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.basicImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    console.log('taken image by camera  :' + this.basicImage);
    await this.uploadImage.getImageConverted(image,'basic');
  }

  async attachProductImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.productImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    console.log('taken image by camera  :' + this.basicImage);
    await this.uploadImage.getImageConverted(image,'product');
   
  }

  getAllCities() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      //user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.cities = data.data.cities;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseCity($event) {
    const cityData: CitysData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      city_id: $event.target.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.getNeighborhoods(cityData).subscribe(
        (data: CitysResponse) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.neighborhoods = data.data;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseNeighborhood($event) {
    console.log('Neighborhood : ' + $event.target.value);
    this.productAdditionForm.value.neighborhood = $event.target.value;
  }

  // support productive families
  addProduct() {
    this.productAdditionForm.value.basicImage = this.general.getFamiliesBasicImage();
    console.log('bsic image  :' + this.general.getFamiliesBasicImage());
    this.productAdditionForm.value.productImage = this.general.getFamiliesProductImage();
    console.log(
      'product image  :' + this.general.getFamiliesProductImage()
    );
    console.log(
      'support productive families ' +
        JSON.stringify(this.productAdditionForm.value)
    );

    
  
    const registerData:RegisterData = {
      user_type:UserType.market,
      lang: this.langaugeservice.getLanguage(),
      first_name: this.productAdditionForm.value.userName, 
      phone: this.productAdditionForm.value.phoneNumber,
      password: '123456',
      city_id:this.productAdditionForm.value.city,
      neighborhood_id:this.productAdditionForm.value.neighborhood,
      avatar:this.general.getFamiliesBasicImage(),
      license_image:this.general.getFamiliesProductImage()
    };
    this.util.showLoadingSpinner().then((__) => {
      this.auth.register(registerData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            console.log('registerFamily res :' + JSON.stringify(data));
            this.util.showMessage(this.translate.instant('family created successfully')).then((_)=>{
              this.router.navigateByUrl('/tabs/home/families');
            });
            // this.auth.userID.next(data.data.id);
            // this.auth.storeStatusAfterRegisteration(data);
            
            
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filesystem } from '@capacitor/filesystem';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/models/general';
import { environment } from 'src/environments/environment.prod';
import { GeneralService } from '../general/general.service';
import { LanguageService } from '../language/language.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  uploadedImage: string;
  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private generalService: GeneralService
  ) {}

  // read taken image then convert it to file ready to upload
  async getImageConverted(image, imageComeFrom: string) {
    const data = await Filesystem.readFile({
      path: image.path,
    });
    let blob = this.b64toBlob(data.data);
    const file = new File([blob], 'image.jpg');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('lang', this.languageService.getLanguage());
    console.log('form data : ' + JSON.stringify(formData));
    this.uploadTakenImage(formData, imageComeFrom);
  }

  uploadTakenImage(formData, imageComeFrom: string) {
    this.util.showLoadingSpinner().then((__) => {
      this.uploadImage(formData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            console.log('uploaded image is : ' + data.app_url);
            if (imageComeFrom == 'basic')
              this.generalService.setFamiliesBasicImage(data.app_url);
            if (imageComeFrom == 'product')
              this.generalService.setFamiliesProductImage(data.app_url);
            if (imageComeFrom == 'profile')
              this.generalService.setProfileImage(data.app_url);
            if (imageComeFrom == 'donation')
              this.generalService.setDonationImage(data.app_url);
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

  // convert base64 image to blob file
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  uploadImage(data): Observable<GeneralResponse> {
    console.log('----calling upload image -----' + JSON.stringify(data));
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}upload-image`,
      data
    );
  }
}

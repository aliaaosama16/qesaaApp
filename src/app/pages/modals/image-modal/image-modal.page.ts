import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Artical } from 'src/app/models/articals';
import { LanguageService } from 'src/app/services/language/language.service';
import Swiper, {
  Navigation,
  Pagination,
  SwiperOptions,
  EffectCards,
  Zoom,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
Swiper.use([Navigation, Pagination, EffectCards, Zoom]);
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  @Input() orderImage?: string;
  @Input() images: Artical[];
  @Input() imageID: number;
  currentlangauge: string = '';
  @ViewChild('swiper') imageSwiper: SwiperComponent;
  configSlider: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: false,
    effect: 'fade',
    autoplay: false,
    loop: true,
    zoom: {
      maxRatio: 5,
    },
  };

  constructor(
    private language: LanguageService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // console.log('this.currentImage ' + this.imageID);
    this.currentlangauge = this.language.getLanguage();
    console.log('order image : ' + JSON.stringify(this.orderImage));
   // this.imageSwiper.swiperRef.slideTo(this.imageID,100);
  }

  ngAfterViewInit(): void {
    if (this.orderImage ==undefined) {
      console.log('this.imageID  : '+this.imageID)
      this.imageSwiper.swiperRef.slideTo(this.imageID, 100);
    }

    console.log(JSON.stringify(this.imageSwiper.swiperRef));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}

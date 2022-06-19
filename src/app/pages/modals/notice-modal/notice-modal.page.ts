import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-notice-modal',
  templateUrl: './notice-modal.page.html',
  styleUrls: ['./notice-modal.page.scss'],
})
export class NoticeModalPage implements OnInit {
  @Input() haveButton: boolean;
  @Input() buttonText: string;
  @Input() noticeText: string;
  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log('haveButton :' + this.haveButton);
    console.log('buttonText :' + this.buttonText);
    console.log('noticeText :' + this.noticeText);
  }

  showOrders() {
    this.modalCtrl.dismiss().then(() => {
      this.router.navigateByUrl('/tabs/my-orders');
      this.auth.setNoOfNotifications(this.auth.userID.value);
    });
  }
}

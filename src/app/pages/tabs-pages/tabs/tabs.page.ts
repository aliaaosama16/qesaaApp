import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  selectedTab = 'home';
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  currentPlatform: string;
  noOfNotifications: number;
  isLogined: boolean = false;
  inputFocused: boolean;
  // @ViewChild('icon', { read: ElementRef }) icon: ElementRef;
  tabsData = [
    {
      tabName: 'home',
      tabActiveIcon: './../../../assets/icon/tabs-icons/home-outline.svg',
      tabNotActiveIcon: './../../../assets/icon/tabs-icons/home-outline.svg',
    },
    {
      tabName: 'notifications',
      tabActiveIcon:
        './../../../assets/icon/tabs-icons/notifications-active.svg',
      tabNotActiveIcon:
        './../../../assets/icon/tabs-icons/notifications-inactive.svg',
    },
    {
      tabName: 'Donation Order',
      tabActiveIcon: '',
      tabNotActiveIcon: '',
    },
    {
      tabName: 'my-orders',
      tabActiveIcon: './../../../assets/icon/tabs-icons/orders-active.svg',
      tabNotActiveIcon: './../../../assets/icon/tabs-icons/orders-inactive.svg',
    },
    {
      tabName: 'account',
      tabActiveIcon: './../../../assets/icon/tabs-icons/person-outline.svg',
      tabNotActiveIcon: './../../../assets/icon/tabs-icons/person-outline.svg',
    },
  ];

  constructor(
    private auth: AuthService,
    private animationCtrl: AnimationController,
    private router: Router,
    private util: UtilitiesService
  ) {
    this.currentPlatform = this.util.getCapacitorPlatform();

    this.util.getinputStatus().subscribe((currentInoutStatus) => {
      this.inputFocused = currentInoutStatus;
      console.log('currentInoutStatus  :' + this.inputFocused);
    });

    if (this.auth.isAuthenticated.value) {
      this.isLogined = this.auth.isAuthenticated.value;
      this.auth.getNoOfNotifications().subscribe((val) => {
        //  if (val != 0) {
        this.noOfNotifications = val != 0 ? val : 0;
        // } else {
        //   this.noOfNotifications = 0;
        // }
      });
    }
  }

  ngOnInit() {}

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  donate() {
    this.router.navigateByUrl('/tabs/donation-order');
  }
}

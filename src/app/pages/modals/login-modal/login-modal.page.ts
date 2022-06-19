import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {
  
  @Input() providerID:number;
  @Input() orderID:number;
  constructor(private router:Router,public modal:ModalController) { 
    console.log('providerID :'+this.providerID)
    console.log('orderID :'+this.orderID)

  }

  ngOnInit() {
  }


  goLogin(){
    this.modal.dismiss().then((_)=>{

      this.router.navigateByUrl('/login')
    })
    
  }
}

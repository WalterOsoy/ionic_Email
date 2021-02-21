import { Component } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { emailInter } from '../Interfaces/emailIterface';
import { AlertController } from '@ionic/angular';

let regexEmail = new RegExp('[A-Z|a-z|_|.]+[\@][A-Z|a-z|_|.]+[\.][A-Z|a-z]+');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor(private alertCtrl: AlertController,
              private datalocal: DatalocalService
  ) {}

  toAddContact: string="";
  toAddEmail: string="";
  async add(){
    this.toAddContact=this.toAddContact.trim();
    if(regexEmail.test(this.toAddEmail) && this.toAddContact!=""){
      const newEmail: emailInter ={
        name: this.toAddContact,
        email: this.toAddEmail,
      };
      this.datalocal.saveEmail(newEmail);
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'You must fill in the fields correctly',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
}

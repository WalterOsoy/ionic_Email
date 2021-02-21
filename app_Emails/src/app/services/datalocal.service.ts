import { Injectable } from '@angular/core';
import { emailInter } from '../Interfaces/emailIterface';
import { Storage } from '@ionic/storage';
import { exit, mainModule } from 'process';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  emails: emailInter[]= [];

  constructor(private strorage: Storage, 
              public toastController: ToastController
  ) { }
    //157
  saveEmail(emailToAdd: emailInter){
    let exist = false;
    let message='';
    for(const element of this.emails){
      if(element.email===emailToAdd.email){
        exist=true;
        break; 
      }
    }
    console.log(exist);
    if(!exist){
      this.emails.push(emailToAdd);
      message='Contacto agregado con exito'
    }else{
      this.emails=this.emails.filter(mail => mail.email!==emailToAdd.email)
      message='Contacto eliminado con exito'
    }
    this.presentToast(message);
    this.strorage.set('email',this.emails)
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

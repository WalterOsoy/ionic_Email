import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { emailInter } from '../Interfaces/emailIterface';
import { AlertController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  emails: emailInter[];
  SendContact:emailInter[]=[];
  constructor(
    private datalocal: DatalocalService,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer,
  ) {}
  async ngOnInit(): Promise<void> {
     this.emails= await this.datalocal.getEmails();
  }
  toSendContact(item: emailInter){            
    if(this.SendContact.some(x=>item.email===x.email)){
      this.SendContact = this.SendContact.filter(email=>email.email !== item.email);
    }else{
      this.SendContact.push(item);
    }
    console.log(this.SendContact);
  }
  async send(){
    if(this.SendContact.length<1){
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'You must add a destinatary',
        buttons: ['OK']
      });
      await alert.present();
    }else{

    }
  }
}

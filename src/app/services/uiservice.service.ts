import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  constructor(private alertController: AlertController) { }


  async alertaInfo(menssage: string) {
    const alert = await this.alertController.create({
      message: menssage,
      buttons: ['OK']
    });

    await alert.present();
  }
}

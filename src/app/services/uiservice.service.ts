import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  constructor(private alertController: AlertController, public toastController: ToastController) { }


  async alertaInfo(menssage: string) {
    const alert = await this.alertController.create({
      message: menssage,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentToast(menssage: string) {
    const toast = await this.toastController.create({
      message: menssage,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}

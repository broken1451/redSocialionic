import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  public avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  public avatarSlide = {
    allowSlidePrev: false,
    allowSlideNext: false,
    slidesPerView: 3.3,
    freeMode: true,
    onlyExternal: false,
  };

  public usuario: Usuario = {};

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;
  @ViewChild('slideAvatar') slideAvatar: IonSlides;

  constructor(private userService: UserService) {}

  ionViewWillEnter() {

    this.slideAvatar.lockSwipes(false); // bloquear slide
    // console.log({slideslength: this.slidePrincipal.length()})
    // console.log({getActiveIndex: this.slidePrincipal.getActiveIndex()})
  }

  async ngOnInit(){
    this.usuario = await this.userService.getUser();
    console.log(this.usuario);
  }

  logout(){}

  seleccionAvatar(avatar) {
    // avatar.seleccionado =  !avatar.seleccionado ;
    // for (const avata of this.avatars) {
    //    avata.seleccionado = false;
    console.log({ avatar });
    // }
    this.avatars.forEach((ava) => {
      return (ava.seleccionado = false);
    });
    avatar.seleccionado = true;
    // this.avatarSelected.emit(avatar);
    console.log({avatar: avatar.img});
  }
}

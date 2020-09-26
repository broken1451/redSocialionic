import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

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

  @ViewChild('slideAvatar') slideAvatar: IonSlides;
  @Output() avatarSelected = new EventEmitter<string>();
  constructor() {
    // this.slideAvatar.lockSwipes(false); // bloquear slide
   }

  ionViewWillEnter() {
    this.slideAvatar.lockSwipes(false); // bloquear slide
  }

  ionViewDidEnter() {
    this.slideAvatar.lockSwipes(false); // bloquear slide
  }

  ngOnInit() {
    // this.slideAvatar.lockSwipes(false); // bloquear slide
  }

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
    this.avatarSelected.emit(avatar);
    console.log({avatar: avatar.img});
  }

}

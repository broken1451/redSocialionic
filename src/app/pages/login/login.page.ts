import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

  public loginUser = {
    email: 'adrianbravo14511@gmail.com',
    password: '123456',
  };

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.slidePrincipal.lockSwipes(true); // bloquear slide
    // console.log({slideslength: this.slidePrincipal.length()})
    // console.log({getActiveIndex: this.slidePrincipal.getActiveIndex()})
  }

  login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }
    console.log(formLogin.valid);
    console.log(formLogin.value);
    console.log(this.loginUser);

    this.userService.login(this.loginUser.email, this.loginUser.password).subscribe((user) => {
        console.log({ user });
    });
  }

  register(formRegister: NgForm) {
    console.log(formRegister.valid);
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
  }

  mostrarLogin() {
    this.slidePrincipal.lockSwipes(false); // bloquear slide
    this.slidePrincipal.slideTo(1);
    this.slidePrincipal.lockSwipes(true); // bloquear slide
    console.log({ getActiveIndex: this.slidePrincipal.getActiveIndex() });
  }

  mostrarRegistro() {
    this.slidePrincipal.lockSwipes(false); // bloquear slide
    this.slidePrincipal.slideTo(0);
    this.slidePrincipal.lockSwipes(true); // bloquear slide
    console.log({ getActiveIndex: this.slidePrincipal.getActiveIndex() });
  }
}

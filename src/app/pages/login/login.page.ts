import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public loginUser = {
    email: 'adrianbravo14511@gmail.com',
    password: '123456',
  };


  public registerUser: Usuario = {
    email: 'adrianbravo14511@gmail.com',
    nombre: 'Adrian',
    avatar: 'av-1.png',
    password: '123456',
  };

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

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;
  @ViewChild('slideAvatar') slideAvatar: IonSlides;

  constructor(private userService: UserService, private router: Router, private navControler: NavController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.slidePrincipal.lockSwipes(true); // bloquear slide
    this.slideAvatar.lockSwipes(false); // bloquear slide
    // console.log({slideslength: this.slidePrincipal.length()})
    // console.log({getActiveIndex: this.slidePrincipal.getActiveIndex()})
  }

  async login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }
    console.log(formLogin.valid);
    console.log(formLogin.value);
    console.log(this.loginUser);

    const user = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (user) {
      // navegar a tabs
      console.log({user});
      // this.router.navigate(['/main/tabs/tab1']);
      this.navControler.navigateRoot('/main/tabs/tab1', {animated: true});
    }else {
      // mostrar alerta de usuario incorrecto
    }
  }

  async register(formRegister: NgForm) {
    console.log(formRegister.valid);
    if (formRegister.invalid) {
      return;
    }

    const userRegistred = await this.userService.registerUser(this.registerUser);
    if (userRegistred) {
      // navegar a tabs
      console.log({userRegistred});
      // this.router.navigate(['/main/tabs/tab1']);
      this.navControler.navigateRoot('/main/tabs/tab1', {animated: true});
    }else {
      // console.log({userRegistred});
      // mostrar alerta de usuario incorrecto
    }
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
    this.registerUser.avatar = avatar.img;
    // this.avatarSelected.emit(avatar);
    console.log({avatar: avatar.img});
  }


  avatarSelected(event){ // RECIBIDO DESDE OUTPUT
    this.registerUser.avatar = event;
    console.log(event);
  }
}

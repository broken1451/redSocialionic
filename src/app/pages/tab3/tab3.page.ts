import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { UiserviceService } from '../../services/uiservice.service';
import { PostsService } from '../../services/posts.service';

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

  constructor(private userService: UserService, private uiService: UiserviceService, private postService: PostsService) {}

  ionViewWillEnter() {
    console.log('aca tab 3')

    this.slideAvatar.lockSwipes(false); // bloquear slide
    // console.log({slideslength: this.slidePrincipal.length()})
    // console.log({getActiveIndex: this.slidePrincipal.getActiveIndex()})
  }

  async ngOnInit(){
    this.usuario = await this.userService.getUser();
    console.log(this.usuario);

    this.avatars.forEach((av) => {
      // quito todas las seleccionado a false
      return av.seleccionado = false;
    });

    this.avatars.forEach((element) => {
      if (element.img === this.usuario.avatar) {
        console.log({element});
        element.seleccionado = true;
        return;
      }
    });
  }


  // async updateUser(usuario: Usuario){
  async updateUser(usuario: Usuario){
    // console.log(usuario);
    this.usuario.email = usuario.email;
    this.usuario.nombre = usuario.nombre;
    // console.log(this.usuario);
    // if (this.usuario.nombre == usuario.nombre) {
    //   alert('aca no se puede poner nombres iguales ja');
    //   return;
    // }
    const userUpdate = await this.userService.updateUser(this.usuario);
    // console.log({userUpdate});
    if (userUpdate) {
      // toast con mensaje
      this.uiService.presentToast('Registro Actualizado');
    } else {
      // toast con error
      this.uiService.presentToast('Registro no se puedo Actualizar');
    }

  }

  logout(){
    this.userService.logout();
    this.postService.pagina = 0;
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
    this.usuario.avatar =  avatar.img;
    // this.avatarSelected.emit(avatar);
    console.log({avatar: avatar.img});
  }
}

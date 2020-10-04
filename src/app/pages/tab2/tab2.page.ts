import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public tempImages: string[] = [];
  public cargandoGeo: boolean;
  public post = {
    mensaje: '',
    coors: null,
    position: false,
  };
  // public post = {
  //   mensaje: '',
  //   coords: null,
  //   position: false,
  // };

  // tslint:disable-next-line: max-line-length
  constructor(private camera: Camera, private webview: WebView , private postService: PostsService, private router: Router, private geolocation: Geolocation) {
    // this.post = {
    //   mensaje: '',
    //   coords: null,
    //   position: false,
    // }
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.cargandoGeo = false;
  }

  async crearPost() {
   const postCreated = await this.postService.createPost(this.post);
   this.post = {
    mensaje: '',
    coors: null,
    position: false,
   };
   this.tempImages = [];
   this.router.navigateByUrl('/main/tabs/tab1');
  //  console.log(this.post);
  }


  getGeo(){
    if (!this.post.position) {
      this.post.coors = null;
      return;
    }
    this.cargandoGeo = true;
    console.log(this.post);
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      setTimeout(() => {
        this.cargandoGeo = false;
        const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
        this.post.coors = coords;
        console.log({coords});
      }, 2000);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });
  }


  camara(){
    const options: CameraOptions = {
      correctOrientation: true,
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA // carrete de imagenes q esta en el dispositivo
    };

    this.processImg(options);

  }

  library(event?: any){
    console.log(event)
    // user con plugin con https://ionicframework.com/docs/native/image-picker
    const options: CameraOptions = {
      correctOrientation: true,
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY // carrete de imagenes q esta en el dispositivo
    };

    this.processImg(options);
  }

   processImg(options: CameraOptions){
    this.camera.getPicture(options).then(async(imageData: any) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     //  let img = 'data:image/jpeg;base64,' + imageData;
     //  this.tempImages.push(img);

     // webview de ionic
     // const img = window.Ionic.WebView.convertFileSrc(imageData);
     const img = this.webview.convertFileSrc(imageData);
     console.log({imageData})
     // subir imagen al servicio
     this.postService.subirImg(imageData);
     this.tempImages.push(img);
    //  console.log({img});
   }, (err) => {
    // Handle error
   });
  }

}

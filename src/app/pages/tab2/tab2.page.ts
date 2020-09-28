import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  constructor(private postService: PostsService, private router: Router, private geolocation: Geolocation) {
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public posts: Post[] = [];
  public habilitado: boolean;
  public post$: Subscription;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher: IonRefresher;

  constructor(private postService: PostsService) {
    this.habilitado = true;
  }

  ngOnInit() {
    this.siguientes();
    // this.postService.nuevoPost.subscribe((post) => {
    //   this.posts.unshift(post);
    // });
    this.post$ = this.postService.itemsObservable$.subscribe((post) => {
      this.posts.unshift(post);
    });
  }

  ionViewWillEnter(){
    this.siguientes();
    console.log('ionViewWillEnter');
  }

  siguientes(event?: any) {
    console.log({ event });
    // console.log({habilitado: this.habilitado})
    this.postService.getPost().subscribe((res) => {
      // console.log({res});
      this.posts.push(...res.post);
      if (event) {
        event.target.complete();
        console.log({ habilitado: this.habilitado });
        if (res.post.length === 0) {
          // event.target.disabled = true; // desabilitar el infinitescroll
          this.habilitado = false;
          console.log({ habilitado: this.habilitado });
          // this.infiniteScroll.disabled = true; // desabilitar definitivamente el infinitescroll
          this.infiniteScroll.disabled = this.habilitado; // desabilitar definitivamente el infinitescroll
          return;
        }
      }
      console.log(this.posts);
    });
  }

  doRefresh(event) {
    this.posts = [];
    this.habilitado = true;
    console.log({ habilitado: this.habilitado });

    this.postService.getPost(true).subscribe((res) => {
      console.log({ Refresh: res });
      if (event) {
        event.target.complete();
        // this.siguientes();
        this.posts.push(...res.post);
        console.log({ habilitado2: this.habilitado });
      }
      // console.log(this.posts);
    });
  }
}

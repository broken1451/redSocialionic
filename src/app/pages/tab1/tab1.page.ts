import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public posts: Post[] = [];

  constructor(private postService: PostsService) {
  }

  ngOnInit(){
    this.postService.getPost().subscribe((res) => {
      // console.log({res});
      this.posts.push(...res.post);
      // console.log( this.posts);
    });
  }

}

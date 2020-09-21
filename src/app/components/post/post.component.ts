import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  public img1 = '../../../assets/perro-1.jpg';
  public img2 = '../../../assets/perro-2.jpg';
  public img3 = '../../../assets/perro-3.jpg';

  constructor() { }

  ngOnInit() {
    // console.log(this.post);
  }

}

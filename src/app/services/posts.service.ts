import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { Subject } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public pagina: number;
  public nuevoPost = new EventEmitter<Post>();
  private postSubject = new Subject<Post>();
  public itemsObservable$ = this.postSubject.asObservable();

  constructor(private httCliente: HttpClient, private userService: UserService) {
    this.pagina = 0;
  }

  getPost(pull: boolean = false){
    console.log({pull});
    if (pull) {
      this.pagina = 0;
    }
    this.pagina = this.pagina + 1;
    return this.httCliente.get<RespuestaPosts>(`${URL}/posts?pagina=${this.pagina}`);
  }

  createPost(post){
    return new Promise((resolve, reject) => {
      try {
        const headers = new HttpHeaders({
          'x-token': this.userService.token,
        });
        this.httCliente.post(`${URL}/posts`, post, {headers}).subscribe((res) => {
          console.log(res);
          // this.nuevoPost.emit(res['post']);
          this.postSubject.next(res['post']);
          resolve(true);
        });
      } catch (error) {
        reject(false);
      }
    });
  }
}

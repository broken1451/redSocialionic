import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public pagina: number;

  constructor(private httCliente: HttpClient) {
    this.pagina = 0;
  }

  getPost(){
    this.pagina = this.pagina + 1;
    return this.httCliente.get<RespuestaPosts>(`${URL}/posts?pagina=${this.pagina}`);
  }
}

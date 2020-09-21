import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string;

  constructor(private httpClient: HttpClient, private storage: Storage) {
    this.token = null;
  }


  login(email: string, password: string){
    const dataLogin = {email, password};
    return this.httpClient.post(`${URL}/user/login`, dataLogin);
  }


}

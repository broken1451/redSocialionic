import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { catchError, take } from 'rxjs/operators';
import { UiserviceService } from './uiservice.service';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

const URL = environment.url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token: string;
  private usuario: Usuario = {};

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private uiService: UiserviceService,
    private router: Router,
    private navControler: NavController
  ) {
    this.token = null;
  }

  login(email?: string, password?: string) {
    const dataLogin = { email, password };

    return new Promise((resolve, reject) => {
      try {
        console.log('try');
        this.httpClient
          .post(`${URL}/user/login`, dataLogin)
          .pipe(take(1))
          .subscribe(
            async (user) => {
              console.log({ user });
              if (user['ok']) {
                await this.guardaroken(user['token']);
                resolve(user);
              } else {
                this.token = null;
                this.storage.clear();
                reject(false);
              }
            },
            (err) => {
              if (err || !err.ok) {
                console.log(err.error.errors.message);
                this.uiService.alertaInfo(err.error.errors.message);
                this.token = null;
                this.storage.clear();
                reject(`Credenciales incorrectas ${false}`);
              }
            }
          );
      } catch (err) {
        reject(`Credenciales incorrectas ${false}`);
      }
    });
  }


  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navControler.navigateRoot('/login',{animated: true});
  }

  async guardaroken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.verifyToken();
  }

  async cargarStorage() {
    this.token = (await this.storage.get('token')) || null;
  }

  async getUser() {
    if (!this.usuario._id) {
      this.verifyToken();
    }
    // return  { ...this.usuario };
    return  await { ...this.usuario };
  }

  registerUser(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.post(`${URL}/user/create`, usuario).subscribe(
          async (data) => {
            console.log({ data });
            if (data['ok']) {
              await this.guardaroken(data['token']);
              resolve(data);
            } else {
              this.token = null;
              this.storage.clear();
              reject(false);
            }
          },
          (err) => {
            if (err || !err.ok) {
              console.log({ err });
              this.uiService.alertaInfo(
                `El correo ingresado ya existe, El ${err.error.err.errors.email.message}`
              );
              this.token = null;
              this.storage.clear();
              reject(`Error al crear el usuario`);
            }
          }
        );
      } catch (error) {
        reject(`Error al crear el usuario`);
      }
    });
  }

  async validaToken(): Promise<boolean> {
    const token: any = await this.cargarStorage();
    if (!this.token) {
      this.navControler.navigateRoot('/login', { animated: true });
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve, reject) => {
      try {
        const headers = new HttpHeaders({
          'x-token': this.token,
        });
        this.httpClient.get(`${URL}/user/`, { headers }).subscribe(
          (user: any) => {
            if (user['ok']) {
              this.usuario = user['usuario'];
              resolve(true);
            } else {
              reject(false);
              this.navControler.navigateRoot('/login', { animated: true });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } catch (error) {
        reject(`Error al consultar usuario`);
        this.navControler.navigateRoot('/login', { animated: true });
      }
    });
  }

  async verifyToken() {
    await this.cargarStorage();
    if (!this.token) {
      this.navControler.navigateRoot('/login', { animated: true });
      // return Promise.resolve(false);
      return false;
    } else {
      return new Promise<boolean>((resolve, reject) => {
        try {
          const headers = new HttpHeaders({
            'x-token': this.token,
          });
          this.httpClient.get(`${URL}/user/`, { headers }).subscribe(
            (user: any) => {
              if (user['ok']) {
                this.usuario = user['usuario'];
                resolve(true);
              } else {
                reject(false);
                this.navControler.navigateRoot('/login', { animated: true });
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } catch (error) {
          reject(`Error al consultar usuario`);
          this.navControler.navigateRoot('/login', { animated: true });
        }
      });
      return true;
    }
  }


  updateUser(usuario: Usuario){
    return new Promise((resolve, reject) => {
      try {
        const headers = new HttpHeaders({
          'x-token': this.token,
        });
        this.httpClient.put(`${URL}/user/update`, usuario, {headers}).subscribe(async (userUpdate) => {
          console.log({userUpdate});
          if (userUpdate['ok']) {
            await this.guardaroken(userUpdate['token']);
            resolve(userUpdate);
          } else {
            reject(false);
          }
        }, (err)=>{
          console.log(err);
        });
      } catch (error) {
        reject(false);
        console.log(error);
      }
    });
  }
}

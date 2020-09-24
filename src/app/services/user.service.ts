import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";
import { catchError, take } from "rxjs/operators";
import { UiserviceService } from "./uiservice.service";
import { Usuario } from "../interfaces/interfaces";

const URL = environment.url;
@Injectable({
  providedIn: "root",
})
export class UserService {
  public token: string;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private uiService: UiserviceService
  ) {
    this.token = null;
  }

  login(email: string, password: string) {
    const dataLogin = { email, password };

    return new Promise((resolve, reject) => {
      try {
        console.log("try");
        this.httpClient
          .post(`${URL}/user/login`, dataLogin)
          .pipe(take(1))
          .subscribe(
            async (user) => {
              console.log({ user });
              if (user["ok"]) {
                await this.guardaroken(user["token"]);
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

  async guardaroken(token: string) {
    this.token = token;
    await this.storage.set("token", token);
  }

  registerUser(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.post(`${URL}/user/create`, usuario).subscribe(
          async (data) => {
            console.log({ data });
            if (data["ok"]) {
              await this.guardaroken(data["token"]);
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
              // this.uiService.alertaInfo(err.error.error.message);
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
}

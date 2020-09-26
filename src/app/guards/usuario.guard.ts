import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

  public token: any;

  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private userService: UserService,  private router: Router, private navControler: NavController){

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    // return this.userService.validaToken(); // con el metodo de la promesa
    return this.userService.verifyToken(); // con el metodo de la promesa
  }

  //  canLoad(): any {
  //   this.verifyToken();
  // }

  // async verifyToken(): Promise<boolean>{
  //   // this.token = await this.userService.verifyToken();
  //   if (this.userService.verifyToken()) {
  //     return true;
  //   } else{
  //     this.navControler.navigateRoot('/login', {animated: true});
  //     return false;
  //   }
  // }




}

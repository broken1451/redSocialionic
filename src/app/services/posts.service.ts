import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { Subject, from } from 'rxjs';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { File, FileEntry } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import fs from 'FileWriter';
import { FTP } from '@ionic-native/ftp/ngx';

const URL = environment.url;
declare var windows: any

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public pagina: number;
  public nuevoPost = new EventEmitter<Post>();
  private postSubject = new Subject<Post>();
  public itemsObservable$ = this.postSubject.asObservable();

  // tslint:disable-next-line: deprecation
  constructor(
    private httCliente: HttpClient,
    private transfer: FileTransfer,
    private userService: UserService,
    private file: File,
    private fTP: FTP
  ) {
    this.pagina = 0;
  }

  getPost(pull: boolean = false) {
    console.log({ pull });
    if (pull) {
      this.pagina = 0;
    }
    this.pagina = this.pagina + 1;
    return this.httCliente.get<RespuestaPosts>(
      `${URL}/posts?pagina=${this.pagina}`
    );
  }

  createPost(post) {
    return new Promise((resolve, reject) => {
      try {
        const headers = new HttpHeaders({
          'x-token': this.userService.token,
        });
        this.httCliente
          .post(`${URL}/posts`, post, { headers })
          .subscribe((res) => {
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

  subirImg(img: string) {
    console.log({img});

    // const formData = new FormData();
    // formData.append('image', img);

    return new Promise((resolve, reject) => {

      const options: FileUploadOptions = {
        fileKey: 'image', // propiedad de postman
        headers: {
          'x-token': this.userService.token,
        },
      };
      const fileTransfer: FileTransferObject = this.transfer.create();
      // fileTransfer.upload('la imagen, url de archivo a subir', 'url de la peticion', opciones)
      fileTransfer.upload(img, `${URL}/posts/upload`, options).then((data) => {
        console.log({data});
      }).catch((err) => {
          console.log('err: ', err);
      });

      // this.fTP.upload(img, img).subscribe((data) => {
      //   console.log(data)
      // },(err)=>{console.log({err})})

      // try {
      //   const headers = new HttpHeaders({
      //     'x-token': this.userService.token,
      //   });
      //   this.httCliente
      //     .put(`${URL}/posts/upload`, img, { headers })
      //     .subscribe((res) => {
      //       console.log(res);
      //       // this.nuevoPost.emit(res['post']);
      //       this.postSubject.next(res['post']);
      //       // resolve(true);
      //     });
      // } catch (error) {
      //   reject(false);
      // }
   
 
      // const reader = new FileReader();
      // reader.onloadend = () => {
  
      //   const oReq = new XMLHttpRequest();
      //   oReq.open("PUT", `${URL}/posts/upload`, true);
      //   oReq.onload = function (oEvent) {
      //     // all done!
      //     console.log({oEvent});
      //   };
      //     // Pass the blob in to XHR's send method
      //   oReq.send(reader.result);
      //   resolve(reader.result);
      // };
    //   let imgSplit = img.split('/');
    //   console.log({imgSplit})
    //   let imgSplit1 = imgSplit[8].split('?');
    //   console.log({imgSplit1})
    //   let formData = new FormData(); // esto es todo el payload que quiero mandar a subir
    //   formData.append('image', imgSplit1[0]);
    //   let xhr = new XMLHttpRequest(); // inicializar la peticion ajax
    //   console.log(formData)
    //   const  options = { content: formData };
    //   console.log(options)
    //           // Configuracion de la peticion ajax
    //   xhr.onreadystatechange = () => {
    //           console.log('aca1')
    //           if (xhr.readyState === 4) {
    //             console.log(xhr.status);
    //             if (xhr.status === 200) {
    //                 // resolve('Imagen Subida exitosamente' mandar el response exitoso);
    //                 // resolve(xhr.response);
    //                 resolve(JSON.parse(xhr.response));
    //                 console.log('Imagen subida: ', xhr.response);
    //               } else {
    //                 // reject('Imagen Subida exitosamente' mandar el response exitoso);
    //                 // reject(xhr.response);
    //                 reject(JSON.parse(xhr.response));
    //                 console.log(' Error Imagen no subida: ', xhr.response);
    //               }
    //             }
    //   };
    //   // Peticion al servicio
    //   let url = `${URL}/posts/upload`;
    //   console.log({url})
    //       //   // xhr.open('metodo', peticion de servicio, decidir si es asincrono o no);
    //   xhr.open('PUT', url, true);
    //   xhr.setRequestHeader( 'x-token',  this.userService.token);
    //   xhr.send(formData);
    // });

    // const request = new XMLHttpRequest();
    // request.open('PUT', `${URL}/posts/upload`);
    // request.setRequestHeader( 'x-token',  this.userService.token);
    // request.send(formData);

    // fs.root.getFile('image', { create: true, exclusive: false }, function  (file) {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open('PUT', `${URL}/posts/upload`, true);
    //   xhr.responseType = 'arraybuffer';
    //   xhr.addEventListener('load', () => {
    //         if (xhr.status === 200) {
    //         let blob = new Blob([this.xhr.response], { type: 'arraybuffer' });
    //         file.createWriter((fileWriter: FileWriter) => {
    //                 fileWriter.write(blob);
    //             });
    //         }
    //     });
    //   xhr.send();
    // });

    // return new Promise((resolve, reject) => {


    // let formData = new FormData(); // esto es todo el payload que quiero mandar a subir
    // formData.append('image', img);
    // let xhr = new XMLHttpRequest(); // inicializar la peticion ajax
    // console.log(formData)
    // const  options = { content: formData };
    // console.log(options)
    //         // Configuracion de la peticion ajax
    // xhr.onreadystatechange = () => {
    //         console.log('aca1')
    //         if (xhr.readyState === 4) {
    //           console.log(xhr.status);
    //           if (xhr.status === 200) {
    //               // resolve('Imagen Subida exitosamente' mandar el response exitoso);
    //               // resolve(xhr.response);
    //               resolve(JSON.parse(xhr.response));
    //               console.log('Imagen subida: ', xhr.response);
    //             } else {
    //               // reject('Imagen Subida exitosamente' mandar el response exitoso);
    //               // reject(xhr.response);
    //               reject(JSON.parse(xhr.response));
    //               console.log(' Error Imagen no subida: ', xhr.response);
    //             }
    //           }
    // };
    // // Peticion al servicio
    // let url = `${URL}/posts/upload`;
    // console.log({url})
    //     //   // xhr.open('metodo', peticion de servicio, decidir si es asincrono o no);
    // xhr.open('PUT', url, true);
    // xhr.setRequestHeader( 'x-token',  this.userService.token);
    // xhr.send(formData);


    //   window.resolveLocalFileSystemURL(img, (fileEntry: any) => {

    //     fileEntry.file((resFile) => {
    //       console.log({resFile})
    //       var reader = new FileReader();
    //       reader.onloadend = (evt: any) => {
    //         var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
    //         console.log({imgBlob})
    //         imgBlob.name = resFile.name;
    //         resolve(imgBlob);
    //       };

    //       reader.onerror = (e) => {
    //         console.log('Failed file read: ' + e.toString());
    //         reject(e);
    //       };

    //       reader.readAsArrayBuffer(resFile);

    //       fetch(`${URL}/posts/upload`, {
    //         method: 'PUT',
    //         headers: {
    //           // tslint:disable-next-line: object-literal-key-quotes
    //           // 'Authorization': this.userService.token,
    //           // 'Content-Type': 'multipart/form-data',
    //           'x-token': this.userService.token
    //         },
    //         body: resFile.name
    //       }).then(response => response.json())
    //       .catch(error => console.error('Error:', error))
    //       .then(response => console.log('Success:', JSON.stringify(response)));
    //     });

    //   });
    // });

    // const body: FormData = new FormData();
    // body.append('‘userId’', 'tes');
    // body.append('email', 'email');
    // body.append('image', img);


    // const formData = new FormData(); // esto es todo el payload que quiero mandar a subir
    // formData.append('image', img);

    // type: 'application/json',
    // let headers: any = new Headers({'Content-Type': 'multipart/form-data'}),
    //   options: any = new RequestOptions({ headers: headers }),
    //   url: any = this.uploadUrl;
    // const options: FileUploadOptions = {
    //   fileKey: 'image', // propiedad de postman
    //   headers: {
    //     'x-token': this.userService.token,
    //   },
    // };
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // // fileTransfer.upload('la imagen, url de archivo a subir', 'url de la peticion', opciones)
    // fileTransfer.upload(img, `${URL}/posts/upload`, options).then((data) => {
    //   console.log({data});
    // }).catch((err) => {
    //     console.log('err: ', err);
    // });

    // const formData = new FormData(); // esto es todo el payload que quiero mandar a subir
    // formData.append('image', img);
    // console.log(body);
    // fetch(`${URL}/posts/upload`, {
    //   method: 'PUT',
    //   headers: {
    //     // tslint:disable-next-line: object-literal-key-quotes
    //     'Authorization': this.userService.token,
    //     'Content-Type': 'multipart/form-data',
    //     'x-token': this.userService.token
    //   },
    //   body: formData
    // }).then(response => response.json())
    // .catch(error => console.error('Error:', error))
    // .then(response => console.log('Success:', JSON.stringify(response)));

    // console.log({img})
    // return new Promise( (resolve, reject) => {


      // const formData = new FormData();
      // const dataJson = {
      //   'deviceId': 77,
      //   'description': 'gino',
      //   'warningTypeId': 7
      // };
      // const jsonString = JSON.stringify(dataJson);
      // formData.append('image', jsonString);
      // console.log(formData)


      // let formData = new FormData(); // esto es todo el payload que quiero mandar a subir
      // formData.append('image', img);
      // let xhr = new XMLHttpRequest(); // inicializar la peticion ajax
      // console.log(formData)
      // var options = { content: formData };
      // console.log(options)
      //   // Configuracion de la peticion ajax
    //   xhr.onreadystatechange = () => {
    //     console.log('aca1')
    //     if (xhr.readyState === 4) {
    //       console.log(xhr.status);
    //       if (xhr.status === 200) {

    //           // resolve('Imagen Subida exitosamente' mandar el response exitoso);
    //           // resolve(xhr.response);
    //           resolve(JSON.parse(xhr.response));
    //           console.log('Imagen subida: ', xhr.response);
    //         } else {
    //           // reject('Imagen Subida exitosamente' mandar el response exitoso);
    //           // reject(xhr.response);
    //           reject(JSON.parse(xhr.response));
    //           console.log(' Error Imagen no subida: ', xhr.response);
    //         }
    //       }
    //   };
    // // // Peticion al servicio
    //   let url = `${URL}/posts/upload`;
    //   console.log({url})
    // //   // xhr.open('metodo', peticion de servicio, decidir si es asincrono o no);
    //   xhr.open('PUT', url, true);
    //   xhr.setRequestHeader( 'x-token',  this.userService.token);
    //   xhr.send(formData);
  // });

    // subir archivo
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // // fileTransfer.upload('la imagen, url de archivo a subir', 'url de la peticion', opciones)
    // fileTransfer.upload(img, `${URL}/posts/upload`, options).then((data) => {
    //   console.log({data});
    // }).catch((err) => {
    //     console.log('err: ', err);
    // });
    // fileTransfer.
    // fs.root.getFile('video.mp4', { create: true, exclusive: false }, function (file) {
    //   let xhr  = new XMLHttpRequest();
    //   xhr.open("PUT", `${URL}/posts/upload`, true);
    //   xhr.responseType = 'arraybuffer';
    //   xhr.addEventListener('load', () => {
    //     if (xhr.status === 200) {
    //       let blob = new Blob([this.xhr.response], { type: 'arraybuffer' });
    //       file.createWriter((fileWriter: FileWriter) => {
    //         fileWriter.write(blob);
    //       });
    //   });
    //   xhr.send();
    });
  }


  // private uploadFile(serverurl: string, filePath: string): Observable<any> {

  //     return from(this.file.resolveLocalFilesystemUrl(filePath)).pipe(
  //       mergeMap((fileEntry: FileEntry) => {
  //           // wrap callback into observable
  //           return Observable.create(observer => {
  //               fileEntry.file(file => {
  //                   const name = file.name;
  //                   const reader = new FileReader();
  //                   reader.onloadend = () => {
  //                       const imgBlob = new Blob([reader.result], { type: file.type });
  //                       observer.next([imgBlob, name]);
  //                       observer.complete();
  //                   };
  //                   reader.readAsArrayBuffer(file);
  //               }, error => {
  //                   observer.error(error);
  //               });
  //           });
  //       }),
  //       mergeMap(([imgBlob, name]) => {
  //           const formData = new FormData();
  //           formData.append('image', imgBlob, name);
  //           return this.httCliente
  //               .put(`${URL}/posts/upload`, formData).pipe(
  //                   map(() => true)
  //               );
  //       })
  //   );

  // }















  
}

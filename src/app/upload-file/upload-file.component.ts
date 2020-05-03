import { Component, OnInit } from '@angular/core';


import { HostListener } from '@angular/core';
import { Key, element } from 'protractor';

import { AuthService } from '../../app/auth/auth.service.service';
import { Router } from '@angular/router'; 

import { AngularFireStorage } from '@angular/fire/storage'; 
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { Inicio } from '../models/inicio.interface';
import { RevistaServiceService } from '../services/revista-service.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {

  ejecuto: boolean;

  constructor(private router : Router, private authService : AuthService, private storage : AngularFireStorage,private postSvc: RevistaServiceService) { }

uploadPercent: Observable<number>;
urlImage: Observable<string>;

urlPDF: Observable<string>;

  ngOnInit() {
  }


  validacion(){

    let numRev = (document.getElementById('NumRev') as HTMLInputElement).value;
    let fileUnpPDF = (document.getElementById('file-unpload-pdf') as HTMLInputElement).value;
    let fileUnpImg = (document.getElementById('file-unpload-img') as HTMLInputElement).value;


    this.valLetNum();

    if(this.ejecuto==false){

     if(numRev==''){
        window.alert("Numero De Revista Vacio!!!");
      }else if(fileUnpPDF==''){
       window.alert("No se Eligio Un Archivo PDF");
      }else if(fileUnpImg==''){
       window.alert("No se Eligio Una Imagen De Portada");
      }else{    
        this.guardarDatos();
        
      }
    }else if(this.ejecuto==true){}
    
  }

  valLetNum(){
    let parametro = (document.getElementById('NumRev') as HTMLInputElement).value;
    var patron = /^[a-zA-Z0-9\s]*$/;
    
    //console.log(parametro.search(patron));

    if(parametro.search(patron)== -1){     
       window.alert('No se Permiten Teclas Especiales, Intentelo De Nuevo');
       this.ejecuto=true;       
    }else if(parametro.search(patron)== 0){
       this.ejecuto=false;
    } 



   
   
  }

  guardarDatos(){
    
    //insertar codigo para guardar en firebase
    window.alert("Datos Guardados en firebase");
    
  }

  onUpload(element){
    window.alert("Imagen Guardada en firebase");
    const id= Math.random().toString(36).substring(2);
    const file = element.target.files[0];
    const filePath = `Imagenes/imagen_${id}` ; //nombre de la carpeta de imagenes
    const ref= this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file); 
     
this.uploadPercent= task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=> this.urlImage= ref.getDownloadURL())).subscribe();

  }

  onUploadPDF(element){
    window.alert("PDF guardado en firebase");
    const id= Math.random().toString(36).substring(2);
    const file = element.target.files[0];
    const filePath = `Revistas/revista_${id}` ; //nombre de la carpeta de revistas
    const ref= this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file); 
     
this.uploadPercent= task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=> this.urlPDF = ref.getDownloadURL())).subscribe();

  }


}

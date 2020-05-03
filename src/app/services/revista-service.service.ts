import { Inicio } from './../models/inicio.interface';
import { RevistaI } from './../models/revista.interface';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import{AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../models/file.interface';


@Injectable({
  providedIn: 'root'
})
export class RevistaServiceService {
  private postsCollection: AngularFirestoreCollection<RevistaI>;
  private portadaCollection: AngularFirestoreCollection<Inicio>;
  private filePath: any;
  private filePathPDF:any;
  private downloadURL: Observable<string>;
  private downloadURLPDF: Observable<string>;
  revistalista: AngularFireList<any>;
  selectedRevista: RevistaI = new RevistaI();


  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.postsCollection = afs.collection<RevistaI>('Revistas');
    this.portadaCollection=afs.collection<Inicio>('Portada');
  }

  public getAllPosts(): Observable<RevistaI[]> {
    return this.afs
    .collection('Revistas',ref => ref.orderBy('numeroR','asc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as RevistaI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getAllPortadas():Observable<Inicio[]>{
    return this.afs
    .collection('Portada')
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          const data =a.payload.doc.data() as Inicio;
          const id =a.payload.doc.id;
          return{id, ...data};
        })
      )
    );
  }
 

  public getOnePost(id: RevistaI): Observable<RevistaI> {
    return this.afs.doc<RevistaI>(`Revistas/${id}`).valueChanges();
  }

  public deletePostById(post: RevistaI) {
    return this.postsCollection.doc(post.id).delete();
  }

  public editPostById(post: RevistaI, newImage?: FileI, newpdf?:FileI) {
    if (newImage && newpdf) {
      this.uploadImage(post, newImage,newpdf);
    } else {
      return this.postsCollection.doc(post.id).update(post);
    }
  }

  public preAddAndUpdatePost(post: RevistaI, image: FileI, pdf:FileI): void {
    this.uploadImage(post, image,pdf);

  }

  private savePost(Revista: RevistaI) {
    const postObj = {
      numeroR: Revista.numeroR,
      imagenR: this.downloadURL,
      fileRef: this.filePath,
      pdf:this.downloadURLPDF,
      fileRefPDF:this.filePathPDF
     
    };

    if (Revista.id) {
      return this.postsCollection.doc(Revista.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }
    

  }

  private uploadImage(post: RevistaI, image: FileI, pdf:FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            console.log('url_image',urlImage);
            this.uploadPDF(pdf,post);
          });
        })
      ).subscribe();
      
  }
  private uploadPDF(pdf:FileI,post:RevistaI) {
    this.filePathPDF=`pdf/${pdf.name}`;
    const fileRefPDF = this.storage.ref(this.filePathPDF);
    const task = this.storage.upload(this.filePathPDF, pdf);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRefPDF.getDownloadURL().subscribe(urlPDF => {
            this.downloadURLPDF = urlPDF;
            console.log('url_PDF',urlPDF);
            this.savePost(post);
          });
        })
      ).subscribe();
      
  }
  
  

  addRevista(book: RevistaI): void {
    this.postsCollection.add(book);
  }
/**/


}
import { RevistaI } from './../../models/revista.interface';
import { RevistaServiceService } from './../../services/revista-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{NgForm} from '@angular/forms';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  private image: any;
  private pdf: any;
  constructor(public postSvc:RevistaServiceService) { }

  public RevistaForm = new FormGroup({
    numeroR: new FormControl('', [Validators.required,Validators.minLength(2)]),
    imagenR: new FormControl('', Validators.required),
    pdf: new FormControl('', Validators.required),
  });
 
  ngOnInit() {
  }
  addNewPost(data: RevistaI) {
  
      console.log('valid', data);
      this.postSvc.preAddAndUpdatePost(data, this.image,this.pdf);
      this.resetForm();
  }
  get numeroR(){return this.RevistaForm.get('numeroR');}
  get imagenR(){return this.RevistaForm.get('imagenR');}

  handleImage(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image=event.target.files[0]);
  }
  handleImage2(event: any): void {
    this.pdf = event.target.files[0];
    console.log(this.pdf=event.target.files[0]);
  }

  resetForm(productoForm?:NgForm){
    if(productoForm != null)
    productoForm.reset();
    this.postSvc.selectedRevista= new RevistaI();
  }



  }


  





import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { RevistaI } from './../models/revista.interface';
import { RevistaServiceService } from './../services/revista-service.service';
import { Inicio } from '../models/inicio.interface';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public portadas$:Observable<Inicio[]>;

  constructor(private postSvc: RevistaServiceService) { }

  ngOnInit() {
     this.portadas$=this.postSvc.getAllPortadas();
  }
 

}

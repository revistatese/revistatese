import { Inicio } from './../../models/inicio.interface';
import { Observable } from 'rxjs';
import { MaterialModule } from './../../material/material.module';
import { RevistaI } from './../../models/revista.interface';
import { RevistaServiceService } from './../../services/revista-service.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, AfterViewInit {
  @Input() post:Inicio;
  private portadas:Inicio[];
  displayedColumns: String[] = ['numero','portada','pdf','actions'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public InicioForm = new FormGroup({
    numeroR:new FormControl('',Validators.required),
    URLportada: new FormControl('', [Validators.required,Validators.minLength(2)]),
    URLpdf: new FormControl('', Validators.required),
  });
  public portadas$:Observable<Inicio[]>;
  constructor(private postSvc: RevistaServiceService) { }
  ngOnInit() {
    this.postSvc
      .getAllPortadas()
      .subscribe(portadas => (this.dataSource.data = portadas));
      this.portadas$=this.postSvc.getAllPortadas();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(portada:Inicio){
    this.postSvc.selectedInicio=Object.assign({},portada);
  }
  addNewPortada(data: Inicio) {
  
    console.log('valid', data);
    this.postSvc.preAddAndUpdatePortada(data);
    this.resetForm();
}

resetForm(RevistaForm?:NgForm){
  if(RevistaForm != null)
  RevistaForm.reset();
  this.postSvc.selectedInicio= new Inicio();
}
onDeletePost(portada:Inicio) {
  Swal.fire({
    title: '¿Estas Seguro?',
    text: `No podrás revertir esta acción`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar Portada!'
  }).then(result => {
    if (result.value) {
      this.postSvc.deletePortadaById(portada).then(() => {
        Swal.fire('Eliminada!', 'Tu portada ha sido eliminada.', 'success');
      }).catch((error) => {
        Swal.fire('Error!', 'There was an error deleting this post', 'error');
      });
    }
  });

}
}
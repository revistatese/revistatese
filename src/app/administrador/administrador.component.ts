import { Inicio } from './../models/inicio.interface';
import { RevistaI } from './../models/revista.interface';

import { RevistaServiceService } from './../services/revista-service.service';
import { ModalComponent } from './../shared/modal/modal.component';

import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';




import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit, AfterViewInit {
  @Input() post:RevistaI;
  private revistas:RevistaI[];
  displayedColumns: String[] = ['numero', 'actions',];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private postSvc:RevistaServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postSvc
      .getAllPosts()
      .subscribe(posts => (this.dataSource.data = posts));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post:RevistaI) {
    console.log('Edit post', post);
    this.openDialog(post);
  }

  onDeletePost(post:RevistaI) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `No podrás revertir esta acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar Revista!'
    }).then(result => {
      if (result.value) {
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire('Eliminado!', 'Tu revista ha sido eliminada.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });

  }
  onEdit(portada:Inicio){
    this.postSvc.selectedInicio=Object.assign({},portada);
  }
onPreUpdate(revista:RevistaI){
  console.log('Revista',revista);
  this.postSvc.selectedRevista=Object.assign({},revista)
}
onPrePortada(revista:Inicio){
  console.log('Revista',revista);
  this.postSvc.selectedInicio=Object.assign({},revista);
}
  onNewPost() {
    this.openDialog();
  }

  openDialog(post?:RevistaI): void {
    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}

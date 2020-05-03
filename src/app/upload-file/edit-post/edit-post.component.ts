import { MaterialModule } from './../../material/material.module';
import { RevistaI } from './../../models/revista.interface';
import { RevistaServiceService } from './../../services/revista-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, AfterViewInit {
  @Input() post:RevistaI;
  private revistas:RevistaI[];
  displayedColumns: String[] = ['number','numero', 'actions'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private postSvc: RevistaServiceService) { }
  ngOnInit() {
    this.postSvc
      .getAllPosts()
      .subscribe(posts => (this.dataSource.data = posts));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
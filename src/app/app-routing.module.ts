import { NewPostComponent } from './upload-file/new-post/new-post.component';
import { PostComponent } from './upload-file/post/post.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes
import {ContactanosComponent} from './contactanos/contactanos.component'
import { AdministradorComponent } from './administrador/administrador.component'
import{ConocemosComponent} from './conocemos/conocemos.component'
import {EditorialComponent} from './editorial/editorial.component'
import{InicioComponent} from './inicio/inicio.component'
import{LineamientosComponent} from './lineamientos/lineamientos.component'
import {NAnterioresComponent} from './n-anteriores/n-anteriores.component'
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ActualizaRevistaComponent } from './actualiza-revista/actualiza-revista.component';
import { EditPostComponent } from './upload-file/edit-post/edit-post.component';




const routes: Routes = [


  {path:'',redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'post/:id', component:PostComponent},
  {
      path:  'Inicio',
    component: InicioComponent
  },    {
    path:  'Conocenos',
    component:  ConocemosComponent
},
{
  path:  'Lineamientos',
  component:  LineamientosComponent
},
{
  path:  'Editorial',
  component:  EditorialComponent
},
{
  path:  'Contactanos',
  component:  ContactanosComponent
},
{
path:  'Anteriores',
component:  NAnterioresComponent
},
            
              {
                path:  'Administrador',
                component:  AdministradorComponent
                },

                {
                  path:  'upload-file',
                  component:  UploadFileComponent
                  },
 
{
                  path:  'actualiza-revista',
                  component:  ActualizaRevistaComponent
                  },
 {path: 'Revista', component: NewPostComponent},
  
  {path: 'Form', component:EditPostComponent}  
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

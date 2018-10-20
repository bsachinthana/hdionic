import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers/authguard';
import { AdminGuard } from './helpers/AdminGuard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'view', loadChildren: './view-uploads/view-uploads.module#ViewUploadsPageModule', canActivate: [AuthGuard] },  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

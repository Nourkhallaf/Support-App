import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RequestListComponent } from './pages/request/request-list/request-list.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestDetailsComponent } from './pages/request/request-details/request-details.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'requests', component: RequestListComponent, canActivate: [AuthGuard] },
  { path: 'request/:id', component: RequestDetailsComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

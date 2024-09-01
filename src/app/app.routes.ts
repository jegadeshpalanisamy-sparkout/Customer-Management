import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './customer/create/create.component';
import { EditComponent } from './customer/edit/edit.component';
import { ViewComponent } from './customer/view/view.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login' , component: LoginComponent},
    {path:'dashboard' , component: DashboardComponent},
//customer crud routes
// {path:'customer',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard/customer/create', component:CreateComponent},
    {path:'customer/:id/edit', component:EditComponent},
    {path:'customer/:id/view', component:ViewComponent}
];

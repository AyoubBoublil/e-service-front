import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guards";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./users/users.component";
import {ProfileComponent} from "./profile/profile.component";
import {LevelComponent} from "./level/level.component";
import {SubjectComponent} from "./subject/subject.component";

const authModule = () => import('./auth/auth.module').then(m => m.AuthModule);

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'manage-users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'level', component: LevelComponent, canActivate: [AuthGuard]},
  {path: 'subject', component: SubjectComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: authModule},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

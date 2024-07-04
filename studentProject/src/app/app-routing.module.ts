import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvisComponent } from './avis/avis.component';
const routes: Routes = [
  
  { path: '', component: DashboardComponent },
  { path: 'student', component: StudentComponent },
  { path: 'avis', component: AvisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

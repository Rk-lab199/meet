import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetComponent } from './meet/meet.component';

const routes: Routes = [
  { path: '', component: MeetComponent },
  { path: 'meet/:id', component: MeetComponent }, // <== This is what you're missing
  { path: '**', redirectTo: '' } // Optional: wildcard route to redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

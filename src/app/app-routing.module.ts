import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdminGuard } from './admin.guard';
import { AsyncSubjectComponent } from './async-subject/async-subject.component';
import { AuthGuard } from './auth.guard';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { HomeComponent } from './home/home.component';
import { ObservablesVsPromisesComponent } from './observables-vs-promises/observables-vs-promises.component';
import { PromptUserToSaveDataGuard } from './prompt-user-to-save-data.guard';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { ResolveGuard } from './resolve.guard';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canDeactivate: [PromptUserToSaveDataGuard]
  },
  {
    path: 'observablesVsPromises',
    component: ObservablesVsPromisesComponent,
    resolve: {
      data: ResolveGuard
    }
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AdminGuard],
    children: [
      // {path: '', redirectTo: 'replay', pathMatch: 'full'},
      {path: 'replay', component: ReplaySubjectComponent},
      {path: 'async', component: AsyncSubjectComponent},
    ]
  },
  {
    path: 'behaviour-subject',
    component: BehaviorSubjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

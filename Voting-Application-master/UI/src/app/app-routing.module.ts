import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPartyComponent } from './components/add-party/add-party.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { VotingScreenComponent } from './components/voting-screen/voting-screen.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRouteGuard, VoterRouteGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'voting', component: VotingScreenComponent
  , canActivate: [VoterRouteGuard]
},
  { path: 'admin', component: AdminDashboardComponent
  , canActivate: [AdminRouteGuard]
},
  { path: 'addParty', component: AddPartyComponent
  , canActivate: [AdminRouteGuard]
},
  { path: 'addCandidate', component: AddCandidateComponent, canActivate: [AdminRouteGuard]},
  { path: 'addVoter', component: AddVoterComponent, canActivate: [AdminRouteGuard]},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  // { path: '**',
  //   redirectTo: '/home'  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

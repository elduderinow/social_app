import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./routes/overview/overview.component";
import {EditComponent} from "./routes/edit/edit.component";
import {FriendComponent} from "./routes/friend/friend.component";
import {LoginComponent} from "./routes/login/login.component";
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'friend/:email', component: FriendComponent, canActivate: [AuthGuard]  },
  { path: 'edit/:email', component: EditComponent, canActivate: [AuthGuard]  },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

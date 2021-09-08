import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./routes/overview/overview.component";
import {EditComponent} from "./routes/edit/edit.component";
import {FriendComponent} from "./routes/friend/friend.component";

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'friend/:id', component: FriendComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

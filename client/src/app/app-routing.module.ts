import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { MemberListComponent } from './members/member-list/member-list.component'
import { MemberDetailComponent } from './members/member-detail/member-detail.component'
import { ListsComponent } from './lists/lists.component'
import { MessagesComponent } from './messages/messages.component'
import { authGuard } from './_guards/auth.guard'
import { MemberEditComponent } from './members/member-edit/member-edit.component'
import { memberDetailedResolver } from './_resolvers/member-details.resolver'
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component'
import { adminGuard } from './_guards/admin.guard'

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'members/:username',
                component: MemberDetailComponent,
                resolve: { member: memberDetailedResolver },
            },
            { path: 'member/edit', component: MemberEditComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
            {
                path: 'members',
                component: MemberListComponent,
            },
            {
                path: 'admin',
                component: AdminPanelComponent,
                canActivate: [adminGuard],
            },
        ],
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

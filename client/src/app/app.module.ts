import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { NavComponent } from './nav/nav.component'
import { FormsModule } from '@angular/forms'
import { MemberListComponent } from './members/member-list/member-list.component'
import { ListsComponent } from './lists/lists.component'
import { MessagesComponent } from './messages/messages.component'
import { SharedModule } from './_modules/shared.module'
import { ErrorInterceptor } from './_interceptors/error.interceptor'
import { JwtInterceptor } from './_interceptors/jwt.interceptor'
import { MemberCardComponent } from './members/member-card/member-card.component'
import { MemberEditComponent } from './members/member-edit/member-edit.component'
import { GalleryComponent } from 'ng-gallery'
import { LoadingInterceptor } from './_interceptors/loading.interceptor'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        NavComponent,
        MemberListComponent,
        ListsComponent,
        MessagesComponent,
        MemberCardComponent,
        MemberEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        GalleryComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

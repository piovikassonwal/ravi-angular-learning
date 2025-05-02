import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BookInfoComponent } from './pages/component/book-info/book-info.component';
import { BookDetailCardComponent } from './pages/component/book-detail-card/book-detail-card.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: "home",
        component: HomePageComponent,
        children: [
            { path: '', component: BookDetailCardComponent, outlet: 'books' },
        ]
    },
    { path: 'book/:id', component: BookInfoComponent },
    { path: "sign-up", component: SignupPageComponent },
    { path: "login-page", component: LoginPageComponent },
    { path: '**', redirectTo: 'home' }
];
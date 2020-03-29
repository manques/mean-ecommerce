import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SearchComponent } from './page/search/search.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddProductComponent } from './user/add-product/add-product.component';
import { OwnerProductListComponent } from './user/owner-product-list/owner-product-list.component';

import { AuthGaurd } from './auth/auth.gaurd';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'user/product-list', component: OwnerProductListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

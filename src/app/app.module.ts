import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppHeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SearchComponent } from './page/search/search.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { LoadingComponent } from './page/loading/loading.component';
import { SidenavComponent } from './page/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { DialogComponent } from './user/signup/dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { FooterMobileComponent } from './footer/footer-mobile/footer-mobile.component';
import { DialogLoginComponent } from './user/login/dialog-login/dialog-login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { AddProductComponent } from './user/add-product/add-product.component';
import { OwnerProductListComponent } from './user/owner-product-list/owner-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SearchComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LoadingComponent,
    SidenavComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    DialogComponent,
    FooterComponent,
    FooterMobileComponent,
    DialogLoginComponent,
    ProfileComponent,
    ProductListComponent,
    ProductComponent,
    AddProductComponent,
    OwnerProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

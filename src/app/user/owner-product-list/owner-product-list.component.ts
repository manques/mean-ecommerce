import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-product-list',
  templateUrl: './owner-product-list.component.html',
  styleUrls: ['./owner-product-list.component.css']
})

export class OwnerProductListComponent implements OnInit {
  products;
  constructor(private httpService: HttpService,
              private auth: AuthService,
              private router: Router) { }
  ngOnInit() {
    this.getProductList();
  }
  getProductList() {
    this.httpService.getServer('/product/owner-product-list').subscribe( result => {
      console.log(result);
      if (!result['success']) {
          this.auth.isAuth();
          window.localStorage.removeItem('token');
          this.router.navigate(['/login']);
      } else {
        this.products = result['data'];
        console.log(this.products);
      }
    });
  }
}

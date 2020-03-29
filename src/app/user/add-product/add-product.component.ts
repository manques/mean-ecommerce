import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  spinner = false;
  src;
  selectedImage;
  categories = ['cloth', 'grocery', 'electronic', 'travel', 'sport'];
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required ],
    image: ['', Validators.required],
    stock: ['', Validators.required],
    shortDescription: ['', Validators.required],
    longDescription: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private auth: AuthService,
              private router: Router) {}
  onSubmit() {
    this.spinner = true;
    console.log(this.productForm.value);
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('category', this.productForm.value.category);
    formData.append('stock', this.productForm.value.price);
    formData.append('shortDescription', this.productForm.value.shortDescription);
    formData.append('longDescription', this.productForm.value.longDescription);
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('token', window.localStorage.getItem('token'));
    this.http.postServerFile('/product/add-product', formData).subscribe( result => {
      console.log(result);
      this.spinner = false;
      if (!result['success']) {
        this.auth.isAuth();
        window.localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/product-list']);
      }
    });
  }

  // add product image file
  onChange(event) {
    this.selectedImage = event.target.files['0'];
    console.log(this.selectedImage);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (e => {
      this.src = e.target.result;
      console.log(this.src);
      this.productForm.patchValue({
        image: this.src
      });
    });
  }
}

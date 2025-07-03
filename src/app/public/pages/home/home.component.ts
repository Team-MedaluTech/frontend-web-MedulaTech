import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { OffersSliderComponent } from '../../../shared/components/offers-slider/offers-slider.component';
import { ProductCardComponent } from '../../../inventory/components/product-card/product-card.component';
import { ProductService } from '../../../inventory/services/product.service';
import { Product } from '../../../inventory/models/product.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    OffersSliderComponent,
    ProductCardComponent,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.featuredProducts = products.slice(0, 8); // Tomamos los primeros 8 productos
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onAddToCart(product: Product): void {
    // Lógica para agregar al carrito
    console.log('Producto agregado:', product);
  }
}
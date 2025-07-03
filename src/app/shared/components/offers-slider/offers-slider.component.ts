import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderService } from '../../../shared/services/slider.service';
import { Slider } from '../../models/slider.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-offers-slider',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './offers-slider.component.html',
  styleUrls: ['./offers-slider.component.css']
})
export class OffersSliderComponent implements OnInit {
  sliders: Slider[] = [];
  currentIndex = 0;
  loading = true;
  error = false;

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.loadSliders();
  }

  loadSliders(): void {
    this.sliderService.getSliders().subscribe({
      next: (sliders) => {
        this.sliders = sliders;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sliders.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sliders.length) % this.sliders.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
import { Component, ElementRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements AfterViewInit {
  @ViewChild('sliderContainer', { static: false }) sliderContainer: ElementRef | undefined;
  @ViewChild('slider', { static: false }) slider: ElementRef | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrls: string[] }) {}

  currentIndex: number = 0;

  ngAfterViewInit(): void {
    this.showSlide(this.currentIndex);
  }

  showSlide(index: number): void {
    if (this.slider && this.sliderContainer) {
      const slideWidth = this.sliderContainer.nativeElement.offsetWidth;
      this.currentIndex = index;
      const transformValue = -index * slideWidth;
      this.slider.nativeElement.style.transform = `translateX(${transformValue}px)`;
    }
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.getTotalSlides()) % this.getTotalSlides();
    this.showSlide(this.currentIndex);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.getTotalSlides();
    this.showSlide(this.currentIndex);
  }

  getTotalSlides(): number {
    return this.data.imageUrls.length;

  }
}

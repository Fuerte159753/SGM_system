import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CorrectivoComponent } from './correctivo/correctivo.component';
import { PreventivoComponent } from './preventivo/preventivo.component';

@Component({
  selector: 'app-equiposlist',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink, RouterLink, CorrectivoComponent, PreventivoComponent],
  templateUrl: './equiposlist.component.html',
  styleUrl: './equiposlist.component.css'
})
export class EquiposlistComponent {
  currentSlide = 0;
  totalSlides = 2; // Ajusta esto según la cantidad de elementos en el carrusel

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}

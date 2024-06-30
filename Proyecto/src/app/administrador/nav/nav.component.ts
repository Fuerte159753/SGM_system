import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  mostrarMenuTecnicos: boolean = false;
  mostrarMenuEquipos: boolean = false;
  mostrarNavbar: boolean = true;

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.mostrarMenuTecnicos = false;
      this.mostrarMenuEquipos = false;
    }
  }

  toggleMenuTecnicos() {
    this.mostrarMenuTecnicos = !this.mostrarMenuTecnicos;
    if (this.mostrarMenuTecnicos && this.mostrarMenuEquipos) {
      this.mostrarMenuEquipos = false;
    }
  }

  toggleMenuEquipos() {
    this.mostrarMenuEquipos = !this.mostrarMenuEquipos;
    if (this.mostrarMenuEquipos && this.mostrarMenuTecnicos) {
      this.mostrarMenuTecnicos = false;
    }
  }
}

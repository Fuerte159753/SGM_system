import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Swal from 'sweetalert2';

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
  mostraropciones: boolean = false;
  private notyf: Notyf;

  constructor(private el: ElementRef, private roter: Router) {
    this.notyf = new Notyf();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.mostrarMenuTecnicos = false;
      this.mostrarMenuEquipos = false;
      this.mostraropciones = false;
    }
  }

  toggleMenuTecnicos() {
    this.mostrarMenuTecnicos = !this.mostrarMenuTecnicos;
    if (this.mostrarMenuTecnicos) {
      this.mostrarMenuEquipos = false;
      this.mostraropciones = false;
    }
  }
  
  toggleMenuEquipos() {
    this.mostrarMenuEquipos = !this.mostrarMenuEquipos;
    if (this.mostrarMenuEquipos) {
      this.mostrarMenuTecnicos = false;
      this.mostraropciones = false;
    }
  }
  toggleMenuOpciones() {
    this.mostraropciones = !this.mostraropciones;
    if(this.mostraropciones){
      this.mostrarMenuEquipos = false;
      this.mostrarMenuTecnicos = false;
    }
  }  
  other(){
    this.mostrarMenuEquipos = false;
    this.mostrarMenuTecnicos = false;
    this.mostraropciones = false;
  }
  cerrarSesion() {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Seguro de que deseas cerrar sesion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Permanecer'
    }).then((result)=>{
      if (result.isConfirmed){
        sessionStorage.clear();
        this.roter.navigate(['/Login']);
      }
    })
  }
}

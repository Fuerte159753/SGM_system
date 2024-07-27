import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { CommonModule } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lista-asignados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-asignados.component.html',
  styleUrl: './lista-asignados.component.css'
})
export class ListaAsignadosComponent implements OnInit {
  equiposAsignados: any[] = [];
  isModalOpen: boolean = false;
  equiposele: any = '';
  constructor(private service: ServiceService, private el: ElementRef){

  }
  ngOnInit(): void {
    this.listaEquipos();
  }

  listaEquipos(){
    this.service.obtenerlistaAsignados().subscribe(
      (data) => {
        this.equiposAsignados = data;
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }
  openModal(equipo: any):void{
    this.equiposele = equipo
    this.isModalOpen = true;
    setTimeout(() => {
      const modal = document.getElementById('modal-asignar');
      modal?.classList.add('show');
    }, 10);
  }
  closeModal(): void {
    const modal = document.getElementById('modal-asignar');
    modal?.classList.remove('show');
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300);
  }
}

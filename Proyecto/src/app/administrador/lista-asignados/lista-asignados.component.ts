import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-lista-asignados',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, ReactiveFormsModule, FormsModule,],
  templateUrl: './lista-asignados.component.html',
  styleUrls: ['./lista-asignados.component.css']
})
export class ListaAsignadosComponent implements OnInit {
  equiposAsignados: any[] = [];
  isModalOpen: boolean = false;
  equiposele: any = null;
  isModalOpen2: boolean = false;
  updateComentarios: FormGroup;
  idcoment: string = '';
  private notyf: Notyf;

  constructor(private service: ServiceService, private el: ElementRef, private fb: FormBuilder) {
    this.updateComentarios = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.notyf = new Notyf({
      duration: 2000, // Duración de la notificación en milisegundos
      position: {
        x: 'center',
        y: 'top',
      },
      dismissible: true // Permite al usuario cerrar la notificación
    });
  }

  ngOnInit(): void {
    this.listaEquipos();
  }

  listaEquipos() {
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

  openModal(equipo: any): void {
    this.equiposele = equipo;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.equiposele = null; // Resetea el equipo seleccionado
    this.closeModal2();
  }
  closeModal2(): void {
    this.isModalOpen2 = false;
    this.idcoment = '';
  }
  openModal2(id: any) {
    this.isModalOpen2 = true;
    this.idcoment = id;
    this.isModalOpen=false;
  }
  updatecomentario() {
    if (this.updateComentarios.valid) {
      const formData = new FormData();
      formData.append('comentario', this.updateComentarios.get('comentario')?.value);
      formData.append('id', this.idcoment);
      this.service.comentariosupdate(formData).subscribe(
        (response) => {
          if(response.status == 'success'){
            this.notyf.success(response.message);
            this.updateComentarios.reset();
            this.closeModal2(); // Cerrar el modal después de la actualización
            this.listaEquipos(); // Actualizar la lista de equipos si es necesario
          }else{
            this.notyf.error(response.message);
          }
        },
        error => {
          console.error('Error al actualizar el comentario:', error);
        }
      );
    } else {
      this.updateComentarios.markAllAsTouched();
    }
  }  
}
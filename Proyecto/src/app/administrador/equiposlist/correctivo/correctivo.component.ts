import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormsModule,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-correctivo',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './correctivo.component.html',
  styleUrl: './correctivo.component.css'
})
export class CorrectivoComponent implements OnInit {
  equipos: any[] = [];
  isModalOpen: boolean = false;
  equipoSeleccionado: any;
  tecnicos: any[]=[];
  idTecnicoSeleccionado: string | null=null;
  public notyf3: Notyf;
  public Notyf4:Notyf;
  asignarquipo: FormGroup;

  constructor(private service: ServiceService, private el: ElementRef, private fb:FormBuilder) {
       /* */this.notyf3 = new Notyf({
        duration: 2000, // Duración de la notificación en milisegundos
        position: {
          x: 'center',
          y: 'top', // Posición en la parte inferior central
        },
        dismissible: true // Permite al usuario cerrar la notificación
      });
      this.Notyf4 = new Notyf({
        duration: 2000,
        position:{
          x: 'right',
          y: 'center',
        },
      });
      this.asignarquipo = this.fb.group({
        id_equipo:['', Validators.required],
        id_tecnico:['', Validators.required],
        comentario:['', Validators.required]
      })
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }

  ngOnInit(): void {
    this.obtenerE();
    this.listaTec();
    this.asignarquipo.get('id_equipo')?.disable();
  }
  
  obtenerE(): void {
    this.service.obtenerE().subscribe(
      (data) => {
        this.equipos = data;
      },
      (error) => {
        Swal.fire('Hubo un Problema!','Tuvimos un problema al obtener los equipos','error')
      }
    );
  }
  openModal(equipo: any): void {
    this.equipoSeleccionado = equipo;
    this.isModalOpen = true;
    const formattedId = this.equipoSeleccionado.id;
    this.asignarquipo.get('id_equipo')?.setValue(formattedId);
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
      this.asignarquipo.reset();
      this.equipoSeleccionado = null;
      this.equipoSeleccionado = null;
    }, 300); // Retraso para permitir la animación de cierre
  }
  listaTec(){
    this.service.obtenerlistatec().subscribe(
      (response)=>{
        if(!response.data){
          Swal.fire('No hay tecnicos','parece que no hay tecnicos','info')
        }else{
          this.tecnicos = response.data;
        }

      }
    );
  }

  asignarEquipo(): void {
    if(this.asignarquipo.valid){
      const formData = new FormData();
      formData.append('id_equipo', this.asignarquipo.get('id_equipo')?.value);
      formData.append('id_tecnico', this.asignarquipo.get('id_tecnico')?.value);
      formData.append('comentario', this.asignarquipo.get('comentario')?.value);
      this.service.asignarEquipo(formData).subscribe(
        response=>{
          this.notyf3.success('Equipo asignado correctamente.');
          this.closeModal();
        },error=>{
          this.notyf3.error('Hubo un problema al asignar el equipo');
        }
      )
    }else{
      this.asignarquipo.markAllAsTouched();
      this.Notyf4.error('Rellena todos los campos');
    }
  }
}

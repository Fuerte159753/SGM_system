import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormsModule,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-preventivo',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './preventivo.component.html',
  styleUrl: './preventivo.component.css'
})
export class PreventivoComponent implements OnInit {
  equipos2: any[]=[];
  isModalOpen2: boolean = false;
  equipoSeleccionado2: any;
  tecnicos2: any[]=[];
  idTecnicoSeleccionado: string | null=null;
  public notyf: Notyf;
  public Notyf2:Notyf;
  asignarquipo2: FormGroup;

  constructor(private service:ServiceService, private el: ElementRef, private fb:FormBuilder){
   /* */this.notyf = new Notyf({
      duration: 2000, // Duración de la notificación en milisegundos
      position: {
        x: 'center',
        y: 'top', // Posición en la parte inferior central
      },
      dismissible: true // Permite al usuario cerrar la notificación
    });
    this.Notyf2 = new Notyf({
      duration: 2000,
      position:{
        x: 'right',
        y: 'center',
      },
    });
    this.asignarquipo2 = this.fb.group({
      id_equipo:['', Validators.required],
      id_tecnico:['', Validators.required],
      comentario:['', Validators.required]
    })
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeModal2();
    }
  }

  ngOnInit(): void {
    this.obtenerE2();
    this.listaTec2();
    this.asignarquipo2.get('id_equipo')?.disable();
  }
  obtenerE2(): void {
    this.service.obtenerE2().subscribe(
      (data) => {
        if(!data){
          Swal.fire('Hubo un Problema!','Tuvimos un problema al obtener los equipos','info');
        }
        this.equipos2 = data;
      },
      (error) => {
        //Swal.fire('Hubo un Problema!','Tuvimos un problema al obtener los equipos','error');
       this.notyf.error('Parece que no hay Equipos con mantenimiento preventivo');
      }
    );
  }
  openModal2(equipo: any): void {
    this.equipoSeleccionado2 = equipo;
    this.isModalOpen2 = true;
    const formattedId = this.equipoSeleccionado2.id;
    this.asignarquipo2.get('id_equipo')?.setValue(formattedId);
    setTimeout(() => {
      const modal = document.getElementById('modal-asignar2');
      modal?.classList.add('show');
    }, 10);
  }

  closeModal2(): void {
    const modal = document.getElementById('modal-asignar2');
    modal?.classList.remove('show');
    setTimeout(() => {
      this.isModalOpen2 = false;
      this.asignarquipo2.reset();
      this.equipoSeleccionado2 = null;
      this.idTecnicoSeleccionado = null;
    }, 300); // Retraso para permitir la animación de cierre
  }
  listaTec2(){
    this.service.obtenerlistatec().subscribe(
      (response)=>{
        if(!response.data){
          Swal.fire('No hay tecnicos','parece que no hay tecnicos','info')
        }else{
          this.tecnicos2 = response.data;
        }

      }
    );
  }

  asignarEquipo2(): void {
    if(this.asignarquipo2.valid){
      const formData = new FormData();
      formData.append('id_equipo', this.asignarquipo2.get('id_equipo')?.value);
      formData.append('id_tecnico', this.asignarquipo2.get('id_tecnico')?.value);
      formData.append('comentario', this.asignarquipo2.get('comentario')?.value);
      this.service.asignarEquipo(formData).subscribe(
        response=>{
          this.notyf.success('Equipo asignado correctamente.');
          this.closeModal2();
        },error=>{
          this.notyf.error('Hubo un problema al asignar el equipo');
        }
      )
    }else{
      this.asignarquipo2.markAllAsTouched();
      this.Notyf2.error('Rellena todos los campos');
    }
  }
}

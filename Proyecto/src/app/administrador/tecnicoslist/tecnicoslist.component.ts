import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Swal from 'sweetalert2';
import { HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormsModule,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { emailDomainValidator } from './custom-validators';

@Component({
  selector: 'app-tecnicoslist',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './tecnicoslist.component.html',
  styleUrl: './tecnicoslist.component.css'
})
export class TecnicoslistComponent implements OnInit {
  tecnicos: any[] = [];
  filteredTecnicos: any[] = [];
  searchTerm: string = '';
  searchField: string = 'nombre';
  private notyf: Notyf;
  isModalVisible: boolean = false;
  selectedTecnico: any = {};
  updateTecnico:FormGroup;
  mensaje: string = '';
  mensaje2: string = '';

  constructor(private service:ServiceService, private el: ElementRef, private fb:FormBuilder){
    this.notyf = new Notyf({
      duration: 2000, // Duración de la notificación en milisegundos
      position: {
        x: 'center',
        y: 'top', // Posición en la parte inferior central
      },
      dismissible: true // Permite al usuario cerrar la notificación
    });
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'example.com']; 
    this.updateTecnico = this.fb.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      domicilio:['',Validators.required],
      correo: ['', [Validators.required, Validators.email, emailDomainValidator(allowedDomains)]]

    })
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isModalVisible && !this.el.nativeElement.contains(event.target)) {
      this.hideModal();
    }
  }

  ngOnInit(): void {
    this.obtenerTecnicos();
  }
  obtenerTecnicos(): void {
    this.service.obtenerTecnicos().subscribe(
      (response) => {
        if(!response){
          this.notyf.error('Parece que no hay tecnicos registrados');
        }else{
          this.tecnicos = response.data;
          this.filteredTecnicos = this.tecnicos;
        }

      },
      (error) => {
        this.notyf.error('Parece que no hay tecnicos registrados');
        console.error('Error al obtener técnicos', error);
      }
    );
  }
  showModal(tecnico: any, id: any): void {
    this.selectedTecnico = tecnico;
    this.isModalVisible = true;
    this.updateTecnico.patchValue(tecnico);
  }

  hideModal(): void {
    this.isModalVisible = false;
    this.selectedTecnico = {};
  }
  actualizarTecnico(): void {
    if (this.updateTecnico.valid) {
      const formValues = this.updateTecnico.value;
      const hasChanges = Object.keys(formValues).some(key => formValues[key] !== this.selectedTecnico[key]);
  
      if (hasChanges) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡Seguro de cambiar los datos del tecnico!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, actualizar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Enviar datos y ID al servicio
            this.service.actualizarTecnico(this.selectedTecnico.id, formValues).subscribe(
              (response) => {
                this.notyf.success('Datos del técnico actualizados con éxito.');
                this.hideModal();
                this.obtenerTecnicos();
              },
              (error) => {
                this.notyf.error('Error al actualizar los datos del técnico.');
                console.error('Error al actualizar técnico', error);
              }
            );
          } else {
            this.notyf.success('Actualización cancelada.');
            this.hideModal();
          }
        });
      } else {
        this.notyf.error('No se han realizado cambios en los datos del técnico');
      }
    } else {
      this.notyf.error('Revise bien el formulario');
    }
  }
  inabilitar(id: any, estado: any){
    if(estado == 1){
      this.mensaje = '¡Seguro de que quiere inabilitar a este tecnico!';
      this.mensaje2 = 'Sí, inabilitar';
    }else if(estado == 0){
      this.mensaje = '¡Seguro de que quiere volver a habilitar a este tecnico!';
      this.mensaje2 = 'Sí, Habilitar';
    }
    Swal.fire({
      title: '¿seguro?',
      text: this.mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.mensaje2,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.inabilitarTec(id).subscribe(
          (response) => {
            this.notyf.success('Estatus Actualizado');
            this.obtenerTecnicos();
            this.mensaje='';
          },(error)=>{
            this.notyf.error('Error al realizar la operacion');
            this.obtenerTecnicos();
            this.mensaje='';
          }
        );
      } else {
        this.notyf.success('Se cancelo la operacion');
        this.mensaje='';
      }
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todos los técnicos
      this.filteredTecnicos = this.tecnicos;
    } else {
      // Filtrar los técnicos basados en el término de búsqueda y el campo seleccionado
      this.filteredTecnicos = this.tecnicos.filter(tecnico =>
        tecnico[this.searchField].toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

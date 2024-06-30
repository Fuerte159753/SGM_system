import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-registro-equipos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './registro-equipos.component.html',
  styleUrl: './registro-equipos.component.css'
})
export class RegistroEquiposComponent implements OnInit {
  registroequipos: FormGroup;
  constructor(private service:ServiceService, private fb:FormBuilder, private rote:Router){
    this.registroequipos = this.fb.group({
      idequipo:['', [Validators.required]],
      marca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      modelo: ['', [Validators.required]],
      tipomantenimiento: ['', [Validators.required]],
      ram: ['', [Validators.required]],
      procesador: ['', [Validators.required, Validators.minLength(10)]],
      almacenamiento: ['',[Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.registroequipos.reset();
    this.registroequipos.get('idequipo')?.disable();
    this.ob();
  }
  ob(){
    this.service.ide().subscribe(
      response => {
        const formattedId = this.formatEmployeeId(response.next_id);
        this.registroequipos.get('idequipo')?.setValue(formattedId);
      },error => {
        Swal.fire('Error', 'No se pudo obtener el id mas reciente. Inténtalo más tarde.', 'error');
        this.rote.navigate(['/WelcomeAdmin/inicio']);
      }
    );
  }
  formatEmployeeId(id: number): string {
    return 'ER' + id.toString().padStart(4, '0');
  } 
  registro(){
    if (this.registroequipos.valid) {
      const formData = new FormData();
      formData.append('idequipo', this.registroequipos.get('idequipo')?.value);
      formData.append('marca', this.registroequipos.get('marca')?.value);
      formData.append('modelo', this.registroequipos.get('modelo')?.value);
      formData.append('tipomantenimiento', this.registroequipos.get('tipomantenimiento')?.value);
      formData.append('ram', this.registroequipos.get('ram')?.value);
      formData.append('procesador', this.registroequipos.get('procesador')?.value);
      formData.append('almacenamiento', this.registroequipos.get('almacenamiento')?.value);
      formData.append('tipo', this.registroequipos.get('tipo')?.value);

      this.service.regequi(formData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Equipo Registrado Correctamente',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.registroequipos.reset();
          this.rote.navigate(['/WelcomeAdmin/inicio']);
          
        },
        error => {
          Swal.fire('Error', 'No se pudo registrar el Equipo. Inténtalo más tarde.', 'error');
        }
      );
    } else {
      this.registroequipos.markAllAsTouched();
      Swal.fire('Error','Por favor completa el formulario','error');
    }
  }
}

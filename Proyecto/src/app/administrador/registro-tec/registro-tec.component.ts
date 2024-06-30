import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-tec',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './registro-tec.component.html',
  styleUrl: './registro-tec.component.css'
})
export class RegistroTecComponent implements OnInit {
  Regtec: FormGroup;

  constructor( private service:ServiceService, private fb:FormBuilder, private rote:Router ){
    this.Regtec = this.fb.group({
      numempleado: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confipassword: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', Validators.required]
    }, { validator: this.checkPasswords }); 
  }
  ngOnInit(): void { 
    this.Regtec.reset();
    this.Regtec.get('numempleado')?.disable();
    this.obid();
  }
  obid() {
    this.service.idtec().subscribe(
      response => {
        const formattedId = this.formatEmployeeId(response.next_id);
        this.Regtec.get('numempleado')?.setValue(formattedId);
      },
      error => {
        Swal.fire('Error', 'No se pudo obtener el número de empleado. Inténtalo más tarde.', 'error');
        this.rote.navigate(['/WelcomeAdmin/inicio']);
      }
    );
  }
  formatEmployeeId(id: number): string {
    return 'RT' + id.toString().padStart(4, '0');
  }  
  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confipassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  registro() {
    if (this.Regtec.valid) {
      const formData = new FormData();
      formData.append('numempleado', this.Regtec.get('numempleado')?.value);
      formData.append('name', this.Regtec.get('name')?.value);
      formData.append('apellido', this.Regtec.get('apellido')?.value);
      formData.append('email', this.Regtec.get('email')?.value);
      formData.append('password', this.Regtec.get('password')?.value);
      formData.append('telefono', this.Regtec.get('telefono')?.value);
      formData.append('direccion', this.Regtec.get('direccion')?.value);

      this.service.regtec(formData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Tecnico registrado correctamente',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.Regtec.reset();
          this.rote.navigate(['/WelcomeAdmin/inicio']);
          
        },
        error => {
          Swal.fire('Error', 'No se pudo registrar al técnico. Inténtalo más tarde.', 'error');
        }
      );
    } else {
      this.Regtec.markAllAsTouched();
      Swal.fire('Error', 'Por favor completa el formulario.', 'error');
    }
  }
}

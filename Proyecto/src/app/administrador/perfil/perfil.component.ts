import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  id: any = '';
  perfilForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private service: ServiceService, private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required]],
      domicilio: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      foto: [''],
      password: ['', Validators.minLength(6)],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('keyAdmin');
    if (this.id) {
      this.Obtenerperfil();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se encontró el ID de administrador en la sesión',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  }

  Obtenerperfil() {
    this.service.getAdminById(+this.id).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.perfilForm.patchValue(response.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: response.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  actualizarPerfil() {
    if (this.perfilForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.perfilForm.get('nombre')?.value);
      formData.append('apellidos', this.perfilForm.get('apellidos')?.value);
      formData.append('telefono', this.perfilForm.get('telefono')?.value);
      formData.append('domicilio', this.perfilForm.get('domicilio')?.value);
      formData.append('correo', this.perfilForm.get('correo')?.value);
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile, this.selectedFile.name);
      }
      if (this.perfilForm.get('password')?.value) {
        formData.append('password', this.perfilForm.get('password')?.value);
      }

      this.service.updateAdmin(this.id, formData).subscribe(
        (response) => {
          if (response.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Perfil actualizado exitosamente',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: response.message,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      );
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }
}
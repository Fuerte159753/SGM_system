import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { emailDomainValidator } from '../tecnicoslist/custom-validators';
import { Router } from '@angular/router';
import { response } from 'express';
import { runInThisContext } from 'node:vm';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  id: any = '';
  adminPerfil: any = {};
  perfilUpdate: FormGroup;
  originalValues: any = {};
  updatepassword: FormGroup;
  selectedFile: File | null = null;
  allowedExtensions = ['image/jpeg', 'image/png', 'image/svg+xml'];
  errorMessage: string | null = null;

  constructor(private service: ServiceService, private fb: FormBuilder, private rote: Router) {
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'example.com']; 
    this.perfilUpdate = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required]],
      domicilio: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, emailDomainValidator(allowedDomains)]],
    });
    this.updatepassword = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkPasswords});
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('keyAdmin');
    this.Obtenerperfil();
  }

  Obtenerperfil() {
    this.service.getAdminById(+this.id).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.adminPerfil = response.data;
          this.perfilUpdate.patchValue(this.adminPerfil);
          this.originalValues = { ...this.perfilUpdate.value }; // Guardar los valores originales
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

  actualizarPerfil() {
    if (this.perfilUpdate.valid) {
      const formValues = this.perfilUpdate.value;
      const hasChanges = Object.keys(formValues).some(key => formValues[key] !== this.adminPerfil[key]);

      if (hasChanges) {
        this.service.updateAdmin(this.id, formValues).subscribe(
          (response) => {
            if (response) {
              Swal.fire({
                icon: 'success',
                title: response.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              }); // Actualizar los valores originales
              this.rote.navigate(['/WelcomeAdmin']);
            }
          },(error) => {
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
        Swal.fire({
          icon: 'info',
          title: 'No se han realizado cambios',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    } else {
      this.perfilUpdate.markAllAsTouched();
    }
  }
  actualizarPasword(){
    if(this.updatepassword.valid){
      const formValues = this.updatepassword.value;
      this.service.updatepass(this.id, formValues).subscribe(
        (response) =>{
          Swal.fire({
            icon: response.status,
            title: response.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.updatepassword.reset();
        }
      );
    }else{
      this.updatepassword.markAllAsTouched();
    }
  }
  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.errorMessage = null;

    if (file && this.allowedExtensions.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Solo se permiten archivos SVG, PNG O JPG.';
    }
  }
  cambiarFoto() {
    if (this.selectedFile) {
      const adminId = this.id;
      const fileName = `administrador_${adminId}${this.getFileExtension(this.selectedFile.name)}`;
      const formData = new FormData();
      formData.append('id', adminId);
      formData.append('nombreFoto', fileName);
      formData.append('foto', this.selectedFile, fileName);
      this.service.updateProfilePicture(formData).subscribe(
        (response) => {
        Swal.fire({
          icon: response.status,
          title: response.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          window.location.reload();
        });
        
      });
    } else {
      this.errorMessage = 'Por favor, selecciona una imagen válida antes de enviar.';
    }
  }
  private getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? `.${parts.pop()}` : '';
  }
}
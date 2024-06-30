import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../service/service.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  Loginform: FormGroup;

  constructor( private service:ServiceService, private fb:FormBuilder, private roter:Router ){
    this.Loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit():void{
    this.Loginform.reset();

  }

  login() {
    if (this.Loginform.valid) {
      const loginData = this.Loginform.value;
      this.service.login(loginData).subscribe(
        (response) => {
          if(response.status == 'success'){
            ///verificar la variable sesion en la memoria de el navegador\\\
            ///implementar la verificacion de cokies en el navegdor para verificar el userKey de los administradores o tecnicos\\\\
            if(response.user == '1'){
              ///inicio de el admin\\\
              Swal.fire({
                icon: 'success',
                title: 'Bienvenid@ '+ response.name,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              sessionStorage.setItem('keyTec', response.id);
              this.roter.navigate(['/WelcomeAdmin']);
            }else if(response.user == '2'){
              ///inicio de sesion de el tecnico\\\
              Swal.fire({
                icon: 'success',
                title: 'Bienvenid@ '+ response.name,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              sessionStorage.setItem('keyAdmin', response.id);
              this.roter.navigate(['/WelcomeTec']);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Verifica tus informacion con un supervisor',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
            }
            console.log('success');
          }else{
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
      this.Loginform.markAllAsTouched();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { TecnicoService } from '../../service/Tecnico.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-nav-u',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-u.component.html',
  styleUrl: './nav-u.component.css'
})
export class NavUComponent implements OnInit {
  id: any = '';
  photo: any = '';

  ngOnInit(): void {
    this.id = sessionStorage.getItem('keyTec');
    this.obtenerphoto();
  }
  constructor(private roter: Router, private service: TecnicoService){

  }
  cerrarsesion() {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Seguro de que deseas cerrar sesion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Permanecer'
    }).then((result)=>{
      if (result.isConfirmed){
        sessionStorage.clear();
        this.roter.navigate(['/Login']);
      }
    })
  }
  obtenerphoto(){
    this.service.getphoto(this.id).subscribe(
      (response)=>{
        this.photo = response.foto;
      }
    )
  }
}

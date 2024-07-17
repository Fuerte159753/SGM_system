import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CorrectivoComponent } from './correctivo/correctivo.component';
import { PreventivoComponent } from './preventivo/preventivo.component';

@Component({
  selector: 'app-equiposlist',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink, RouterLink, CorrectivoComponent, PreventivoComponent],
  templateUrl: './equiposlist.component.html',
  styleUrl: './equiposlist.component.css'
})
export class EquiposlistComponent {

}

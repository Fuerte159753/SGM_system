import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor,NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CorrectivoComponent } from './correctivo/correctivo.component';
import { PreventivoComponent } from './preventivo/preventivo.component';

@Component({
  selector: 'app-equiposlist',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink, RouterLink, CorrectivoComponent, PreventivoComponent, NgClass],
  templateUrl: './equiposlist.component.html',
  styleUrl: './equiposlist.component.css'
})
export class EquiposlistComponent {
  selectedTab: 'preventivo' | 'correctivo' = 'preventivo';

  selectTab(tab: 'preventivo' | 'correctivo') {
    this.selectedTab = tab;
  }
}

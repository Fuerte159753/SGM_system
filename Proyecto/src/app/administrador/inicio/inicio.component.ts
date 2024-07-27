import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ServiceService } from '../../service/service.service';

interface PieChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgClass, NgIf, NgxChartsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  currentDate: Date = new Date();

  Fecha(): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dayOfWeek = daysOfWeek[this.currentDate.getDay()];
    const day = this.currentDate.getDate();
    const month = months[this.currentDate.getMonth()];
    const year = this.currentDate.getFullYear();
    let hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return `${dayOfWeek}, ${day} de ${month} de ${year}, ${formattedTime}`;
  }

  pieChartDataEquipos: PieChartData[] = [];
  totalEquipos: number = 0;
  equiposAsignados: number = 0;
  equiposNoAsignados: number = 0;
  pieChartDataTecnicos: PieChartData[] = [];
  habilitados: number = 0;
  inhabilitados: number = 0;

  view: [number, number] = [500, 300];
  showLegend = true;
  showLabels = true;
  explodeSlices = true;
  doughnut = true;

  colorSchemeEquipos: any = {
    domain: ['#10B981', '#EF4444']
  };

  colorSchemeTecnicos: any = {
    domain: ['#3B82F6', '#F59E0B']
  };

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.graficaequipo();
    this.graficatecnico();
  }

  graficaequipo() {
    this.service.graficaequipo().subscribe(data => {
      this.totalEquipos = data.totalEquipos;
      this.equiposAsignados = data.totalEquiposAsignados;
      this.equiposNoAsignados = this.totalEquipos - this.equiposAsignados;

      this.pieChartDataEquipos = [
        { name: 'Asignados', value: this.equiposAsignados },
        { name: 'No Asignados', value: this.equiposNoAsignados }
      ];
    });
  }

  graficatecnico() {
    this.service.graficatecnico().subscribe(data => {
      this.habilitados = data.habilitados;
      this.inhabilitados = data.inhabilitados;

      this.pieChartDataTecnicos = [
        { name: 'Habilitados', value: this.habilitados },
        { name: 'Inhabilitados', value: this.inhabilitados }
      ];
    });
  }


  numberCardData = [
    { name: 'Ventas', value: 1024 },
    { name: 'Clientes', value: 548 },
    { name: 'Productos', value: 230 },
    { name: 'Facturación', value: 7890 }
  ];

  // Opciones del gráfico
  showXAxis = false; // No mostrar el eje X
  showYAxis = false; // No mostrar el eje Y
  showYAxisLabel = false; // No mostrar etiqueta del eje Y
  showXAxisLabel = false; // No mostrar etiqueta del eje X
  yAxisLabel = ''; // Etiqueta del eje Y
  xAxisLabel = ''; // Etiqueta del eje X
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

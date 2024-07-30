import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ServiceService } from '../../service/service.service';
interface PieChartData {
  name: string;
  value: number;
}

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgClass, NgIf, NgxChartsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {
  isVisible = false;
  animationClass = '';
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth();
  currentMonthName: string = '';
  daysOfWeek: string[] = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  daysInMonthArray: number[] = [];
  firstDayOfWeekArray: undefined[] = [];
  calendarWeeks: any[] = [];
  fecha: string = '';

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.updateCalendar();
  }

  updateCalendar() {
    this.currentMonthName = this.months[this.currentMonth];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
  
    this.daysInMonthArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.firstDayOfWeekArray = Array(firstDayOfWeek).fill(undefined);
  
    // Generar las semanas para la tabla
    const calendarDays = [...this.firstDayOfWeekArray, ...this.daysInMonthArray];
    const numberOfWeeks = Math.ceil(calendarDays.length / 7);
    this.calendarWeeks = Array.from({ length: numberOfWeeks }, (_, i) => 
      calendarDays.slice(i * 7, i * 7 + 7)
    );}

  isToday(day: number): boolean {
    const today = new Date();
    return this.currentYear === today.getFullYear() && 
           this.currentMonth === today.getMonth() && 
           day === today.getDate();
  }

  Fecha(): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dayOfWeek = daysOfWeek[this.currentDate.getDay()];
    const day = this.currentDate.getDate();
    const month = months[this.currentDate.getMonth()];
    return `${dayOfWeek}, ${day} de ${month}`;
  }

  pieChartDataEquipos: PieChartData[] = [];
  totalEquipos: number = 0;
  equiposAsignados: number = 0;
  equiposNoAsignados: number = 0;
  pieChartDataTecnicos: PieChartData[] = [];
  habilitados: number = 0;
  inhabilitados: number = 0;
  barChartDataEquipos: BarChartData[] = [];
  barChartDataTecnicos: BarChartData[] = [];
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
    this.updateCalendar();
    this.fecha = this.Fecha();
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

      const totalEquipos = this.totalEquipos;
      this.barChartDataEquipos = this.pieChartDataEquipos.map(d => ({
        name: d.name,
        value: (d.value / totalEquipos) * 100
      }));
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

      const totalTecnicos = this.habilitados + this.inhabilitados;
      this.barChartDataTecnicos = this.pieChartDataTecnicos.map(d => ({
        name: d.name,
        value: (d.value / totalTecnicos) * 100
      }));
    });
  }

  percentageTickFormatting(val: number): string {
    return `${val.toFixed(1)}%`;
  }
}

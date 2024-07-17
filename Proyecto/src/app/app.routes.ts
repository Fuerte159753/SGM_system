import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RegistroTecComponent } from './administrador/registro-tec/registro-tec.component';
import { verifitecni, verifiadmin } from './guard/autorizacion.guard';
import { InicioComponent } from './administrador/inicio/inicio.component';
import { RegistroEquiposComponent } from './administrador/registro-equipos/registro-equipos.component';
import { TecnicoslistComponent } from './administrador/tecnicoslist/tecnicoslist.component';
import { EquiposlistComponent } from './administrador/equiposlist/equiposlist.component';
import { ErroradminComponent } from './administrador/erroradmin/erroradmin.component';
import { IniciousuarioComponent } from './tecnico/iniciousuario/iniciousuario.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';
import { ListaAsignadosComponent } from './administrador/lista-asignados/lista-asignados.component';

export const routes: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: '', redirectTo: 'Login', pathMatch: 'full' },

    ///rutas tecnico \\\ 
    { path: 'WelcomeTec', component: TecnicoComponent, canActivate: [verifitecni], children:[
        { path: 'inicio', component: IniciousuarioComponent },
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],},

    ///rutas admin\\\
    { path: 'WelcomeAdmin', component: AdministradorComponent, canActivate:[verifiadmin], children: [
        { path: 'inicio', component: InicioComponent },
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },    
        { path: 'tecRegistro', component: RegistroTecComponent },
        { path: 'registroEquipos', component: RegistroEquiposComponent },
        { path: 'listaTecnicos', component: TecnicoslistComponent },
        { path: 'listaEquipos', component: EquiposlistComponent },
        { path: 'lista-asignados', component: ListaAsignadosComponent},

        { path: '**', component: ErroradminComponent },
    ],},
    
    { path: 'Recoverpass', component:RecoverpasswordComponent},
    { path: '**', component: ErrorComponent },
];

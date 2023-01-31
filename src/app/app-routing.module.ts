import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio-docente',
    loadChildren: () => import('./inicio-docente/inicio-docente.module').then( m => m.InicioDocentePageModule)
  },
  {
    path: 'loginalumno',
    loadChildren: () => import('./loginalumno/loginalumno.module').then( m => m.LoginalumnoPageModule)
  },
  {
    path: 'inicioalumno',
    loadChildren: () => import('./inicioalumno/inicioalumno.module').then( m => m.InicioalumnoPageModule)
  },
  {
    path: 'generarqr',
    loadChildren: () => import('./generarqr/generarqr.module').then( m => m.GenerarqrPageModule)
  },
  {
    path: 'escanearqr',
    loadChildren: () => import('./escanearqr/escanearqr.module').then( m => m.EscanearqrPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

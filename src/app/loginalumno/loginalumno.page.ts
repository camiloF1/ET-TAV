import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../modelo/Auth';

@Component({
  selector: 'app-loginalumno',
  templateUrl: './loginalumno.page.html',
  styleUrls: ['./loginalumno.page.scss'],
})
export class LoginalumnoPage implements OnInit {

  loginFormAlumno: FormGroup|any;
  public datosDelUsuario: AuthResponse | null | Observable<null> | any;

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit() {
    this.loginFormAlumno = new FormGroup({
      'correo': new FormControl(),
      'password': new FormControl()
    })
  }

  loginDataAlumno(loginFormAlumno: FormGroup){
    this.http.get<any>("https://bd-examen-production.up.railway.app/usuariosAlumno")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.correo === this.loginFormAlumno.value.correo &&
        a.password === this.loginFormAlumno.value.password
      });
      if(user){
        alert('Te has logueado')
        this.loginFormAlumno.reset();
        this.route.navigate(['/inicioalumno'], {queryParams:{
          id: this.datosDelUsuario?.id,
          username: this.datosDelUsuario?.username,
          nombre: this.datosDelUsuario?.nombre,
          apellido: this.datosDelUsuario?.apellido,
          edad: this.datosDelUsuario?.edad,
          carrera: this.datosDelUsuario?.carrera
        }});
      }else{
        alert('Usuario o contraseña incorrectos');
        this.route.navigate(['/loginalumno'])
      }
    }, err=>{
      alert('Algo ha salido mal');
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../modelo/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup|any;
  public datosDelUsuario: AuthResponse | null | Observable<null> | any;
  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'correo': new FormControl(),
      'password': new FormControl()
    })
  }

  loginData(loginForm: FormGroup){
    // console.log(this.loginForm.value)
    this.http.get<any>("https://bd-examen-production.up.railway.app/usuariosDocente")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.correo === this.loginForm.value.correo &&
        a.password === this.loginForm.value.password
      });
      if(user){
        alert('Te has logueado')
        this.loginForm.reset();
        this.route.navigate(['/inicio-docente'],{queryParams:{
          id: this.datosDelUsuario?.id,
          username: this.datosDelUsuario?.username,
          nombre: this.datosDelUsuario?.nombre,
          apellido: this.datosDelUsuario?.apellido,
          edad: this.datosDelUsuario?.edad,
          asignatura: this.datosDelUsuario?.asignatura


        }});
      }else{
        alert('Usuario o contraseña incorrectos');
        this.route.navigate(['/login'])
      }
    }, err=>{
      alert('Algo ha salido mal');
    })
  }
}

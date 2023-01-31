import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-docente',
  templateUrl: './inicio-docente.page.html',
  styleUrls: ['./inicio-docente.page.scss'],
})
export class InicioDocentePage {
  public id: string = '';
  public nombre: string='';
  public apellido: string='';
  public username: string='';
  public edad: string='';
  public asignatura: string='';


  constructor(
    private route: ActivatedRoute
  ) { }


  ionViewWillEnter(){
    this.route.queryParams.subscribe(parametros =>{
      this.id = parametros['id'] || '';
      this.username = parametros['username'] || '';
      this.apellido = parametros['apellido'] || '';
      this.username = parametros['username'] || '';
      this.edad = parametros['edad'] || '';
      this.asignatura = parametros['asignatura'] || '';
      this.nombre = parametros['nombre'] || '';
  })
}

}

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-inicioalumno',
  templateUrl: './inicioalumno.page.html',
  styleUrls: ['./inicioalumno.page.scss'],
})
export class InicioalumnoPage implements OnDestroy{
  public id: string = '';
  public nombre: string='';
  public apellido: string='';
  public username: string='';
  public edad: string='';
  public carrera: string='';

scannedResult: any;

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
      this.carrera = parametros['carrera'] || '';
      this.nombre = parametros['nombre'] || '';
  })
}

async checkPermission(){

    try{
      const status = await BarcodeScanner.checkPermission({force: true});
      if(status.granted){
        return true;
      }
      return false;
    } catch(e){
      console.log(e);
    }
    return
}


  async startScan(){
    try{
      const permission = await this.checkPermission();
      if(!permission){
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result?.hasContent){
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.scannedResult);
      }
    } catch(e){
      console.log(e);
      this.stopScan();
    }
  }

    stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }


  ngOnDestroy(): void {
    this.stopScan();
  }


}

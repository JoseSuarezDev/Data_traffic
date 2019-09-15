import { Injectable } from '@angular/core';
import { ProductData, ProveedorData } from '../models/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private proveedores = [
    {
      id: 1,
      name: 'senor carlos',
      typeProducts: 'telefonos'
    },
    {
      id: 2,
      name: 'mariana c.a.',
      typeProducts: 'auriculares'
    },
    {
      id: 3,
      name: 'Tecno Cell',
      typeProducts: 'carcasas'
    },
  ]

  private products = [
    {
      id: 1,
      name: 'telefono',
      proveedor: this.proveedores[1].name,
      stock: 31,
      numRef: 521
    },
    {
      id: 2,
      name: 'reloj',
      proveedor: this.proveedores[1].name,
      stock: 12,
      numRef: 522
    },
    {
      id: 3,
      name: 'audifonos',
      proveedor: this.proveedores[2].name,
      stock: 10,
      numRef: 523
    },
  ]
  
  private shops = [
    {
      id: 1,
      rif: 'j-00178041-6',
      name: 'sambil',
      state: 'miranda',
      products: []
    },
    {
      id: 2,
      name: 'Tolon',      
      rif: 'j-00178907-0',
      state: 'miranda',
      products: []
    },
    {
      id: 3,
      name: 'Centro',
      rif: 'j-00173641-0',
      state: 'caracas',
      products: []
    }
  ]
  
  private stoks = {
    tiendas: this.shops
  }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  private dialogStreamSubject = new Subject<string>();
  private snackBarStreamSubject = new Subject<string>();
  private editFormStreamSubject = new Subject<string>();
  private countSelectStreamSubject = new Subject<any>();

   // Observable string streams
   missionAnnounced$ = this.missionAnnouncedSource.asObservable();
   missionConfirmed$ = this.missionConfirmedSource.asObservable();
   dialogAsObservable$ = this.dialogStreamSubject.asObservable();
   snackBarAsObservable$ = this.snackBarStreamSubject.asObservable();
   editFormAsObservable$ = this.editFormStreamSubject.asObservable();
   countSelectAsObservable$ = this.countSelectStreamSubject.asObservable();

    // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  countSelectSubject(mission: any) {
    this.countSelectStreamSubject.next(mission);
  }

  editFormSubject(mission: string) {
    this.editFormStreamSubject.next(mission);
  }

  confirmMission(astronaut: string) {    
    this.missionConfirmedSource.next(astronaut);
  }

  dialogSubject(dats: string) {
    this.dialogStreamSubject.next(dats);
  }

  snackBarSubject(dats: string) {
    this.snackBarStreamSubject.next(dats);
  }

  public initStorage() {     
    localStorage.setItem('products', JSON.stringify(this.products) )
    localStorage.setItem('proveedores', JSON.stringify(this.proveedores) )
    localStorage.setItem('tiendas', JSON.stringify(this.shops) )
    localStorage.setItem('stock', JSON.stringify(this.stoks) )
  }

  public setItem( store: string, item = []) {     
    const res = JSON.stringify(item)    
    localStorage.setItem(store, res)
  }

  public getItems(item: string = 'products') { 
    return JSON.parse( localStorage.getItem(item) )  
  }

}

import { Injectable } from '@angular/core';
import { ProductData, ProveedorData } from '../models/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private products = [
    {
      position: 1,
      name: 'telefono',
      proveedor: 'senor carlos',
      stock: 31,
      id: 1
    },
    {
      id: 2,
      name: 'reloj',
      proveedor: 'senor carlos',
      stock: 12
    },
    {
      id: 3,
      name: 'audifonos',
      proveedor: 'minerva c.a.',
      stock: 10
    },
  ]
  
  private proveedores = [
    {
      id: 1,
      name: 'senor carlos'
    },
    {
      id: 2,
      name: 'mariana c.a.'
    },
    {
      id: 3,
      name: 'Tecno Cell'
    },
  ]
  
  private shops = [
    {
      id: 1,
      name: 'sambil',
      products: []
    },
    {
      id: 2,
      name: 'Tolon',
      products: []
    },
    {
      id: 3,
      name: 'Centro',
      products: []
    }
  ]
  
  private stoks = {
    producs: []
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

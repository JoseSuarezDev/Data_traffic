import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  active = 0;

  foods: Food[] = [
    {value: 'Products', viewValue: 'Productos'},
    {value: 'Tiendas', viewValue: 'Tiendas'},
    {value: 'Proveedores', viewValue: 'Proveedores'},
    {value: 'Stock', viewValue: 'Stock'},
  ];

  constructor(  private store: StoreService ) {
    store.countSelectAsObservable$.subscribe(
      astronaut => {
        this.active = astronaut;        
      });
   }

  ngOnInit() {
    this.active = JSON.parse( localStorage.getItem('selected') )
  }  

  openDialog(value){     
    if(value = 'crear'){
    this.store.dialogSubject(value); 
    } else { this.store.editFormSubject('value.toLowerCase()');  }
  }

  change(value) {
    // this.store.getItems(value.toLowerCase()).subscribe(); 
    this.store.confirmMission(value.toLowerCase());      
  }

  delete() {
    this.store.snackBarSubject('snack');  
  }

}

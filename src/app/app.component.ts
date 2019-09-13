import { Component, OnInit } from '@angular/core';

import { StoreService } from "./services/store.service";

// Modal
import { MatDialog } from '@angular/material';
import { ModalComponent } from './components/modal/modal.component';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StoreService]
})
export class AppComponent implements OnInit {

  // Modal
  animal: string;
  name: string;

  constructor( private service: StoreService,
               public dialog: MatDialog,
               private _snackBar: MatSnackBar ) {
    service.missionConfirmed$.subscribe(
      astronaut => {      
      });

    service.dialogAsObservable$.subscribe(
      name => {
        this.name = name
        this.openDialog();  
      });

    service.snackBarAsObservable$.subscribe(
      res => {
        this.openSnackBar('Esta seguro que desea eliminar los items?', 'Si')    
      });
  }
  
  ngOnInit() {

    let mission = 'Fly to the moon!';
    this.service.announceMission(mission);

    this.service.initStorage()

  }

  openDialog(): void {
    const dialogRef = this.dialog.open( ModalComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pushItem(result)
      this.animal = result;
    });
  }

  pushItem(value) {
    const state = JSON.parse( localStorage.getItem('products'))
    let id = state.length
    id++
    value.id = id
    state.push(value)
    JSON.stringify(state)
    localStorage.setItem('products', JSON.stringify(state) )

    this.service.confirmMission('products'); 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000}).onAction().subscribe(() => {     
      localStorage.setItem('selected', '')
      this.service.announceMission('products');
    });
  }

}

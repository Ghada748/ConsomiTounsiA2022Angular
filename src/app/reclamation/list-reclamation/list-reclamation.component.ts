import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Reclamation} from "../model/reclamation";
import {IReclamationService} from "../services/reclamation.service";
import {CreateReclamationComponent} from "../create-reclamation/create-reclamation.component";
import {UpdateReclamationComponent} from "../update-reclamation/update-reclamation.component";


@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  reclamations: Reclamation[] = [];
  constructor(
    private dialog: MatDialog,
    private service: IReclamationService
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => {
      // @ts-ignore
      this.reclamations = data;
    })

  }


  openAddDialog() {
    const dialogRef = this.dialog.open(CreateReclamationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  openUpdateDialog(id: any) {
    const dialogRef = this.dialog.open(UpdateReclamationComponent, {
      width: '400px',
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  supprimer(id: any) {
    if(confirm('voulez vous vraiment supprimer ?')){
      this.service.delete(id).subscribe(r => this.ngOnInit());
    }
  }
}

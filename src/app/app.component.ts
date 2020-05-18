import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddRuleComponent } from './add-rule/add-rule.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uitest';
  getStarted = false;
  Jsonresult: string;
  constructor(public dialog: MatDialog) { }
  onStart(): void {
    const dialogRef = this.dialog.open(AddRuleComponent, {
      width: '800px',
      data: {name: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.Jsonresult = result;
    });
  }
}

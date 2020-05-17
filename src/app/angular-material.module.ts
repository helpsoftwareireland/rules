import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule
    ]
})

export class AngularMaterialModule { }
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './components/user-management.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        UserManagementComponent
    ],
    imports: [
        UserManagementRoutingModule,
        FormsModule,
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatSlideToggleModule
    ]
})
export class UserManagementModule { }

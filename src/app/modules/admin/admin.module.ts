import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    DashboardComponent,
    PostTaskComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }

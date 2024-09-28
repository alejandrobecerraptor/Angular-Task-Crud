import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
// import { ShowTasksComponent } from './pages/show-tasks/show-tasks.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDefaultComponent } from "./components/buttons/button-default/button-default.component";



@NgModule({
  declarations: [
    CreateTaskComponent,
    // ShowTasksComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonDefaultComponent
],
  exports: [
    CreateTaskComponent,
    // ShowTasksComponent,
    SidebarComponent
  ]
})
export class SharedModule { }

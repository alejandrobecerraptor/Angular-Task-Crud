import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './shared/pages/create-task/create-task.component';
import { ShowTasksComponent } from './shared/pages/show-tasks/show-tasks.component';

const routes: Routes = [
  {
    path: 'createTask',
    component: CreateTaskComponent,
  },
  {
    path: 'showTasks',
    component: ShowTasksComponent,
  },
  {
    path: '**',
    redirectTo: 'createTask',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

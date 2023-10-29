import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCreateUpdateComponent } from './admin-create-update/admin-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent,
    children: [
      {
        path: 'index',
        component: AdminIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: AdminCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: AdminCreateUpdateComponent,
  },
  {
    path: 'delete/:id',
    component: AdminCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

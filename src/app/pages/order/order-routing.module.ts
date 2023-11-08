import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreateUpdateComponent } from './order-create-update/order-create-update.component';
import { OrderIndexComponent } from './order-index/order-index.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  {
    path: '',
    component: OrderIndexComponent,
    children: [
      {
        path: 'index',
        component: OrderIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: OrderCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: OrderCreateUpdateComponent,
  },
  {
    path: 'view/:id',
    component: OrderViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

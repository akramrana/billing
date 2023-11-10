import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryCreateUpdateComponent } from './delivery-create-update/delivery-create-update.component';
import { DeliveryIndexComponent } from './delivery-index/delivery-index.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryIndexComponent,
    children: [
      {
        path: 'index',
        component: DeliveryIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: DeliveryCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: DeliveryCreateUpdateComponent,
  },
  {
    path: 'view/:id',
    component: DeliveryViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }

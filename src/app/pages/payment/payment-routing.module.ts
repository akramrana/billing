import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCreateUpdateComponent } from './payment-create-update/payment-create-update.component';
import { PaymentIndexComponent } from './payment-index/payment-index.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentIndexComponent,
    children: [
      {
        path: 'index',
        component: PaymentIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: PaymentCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: PaymentCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule),
    },
    {
      path: 'bill',
      loadChildren: () => import('./bill/bill.module')
        .then(m => m.BillModule),
    },
    {
      path: 'delivery',
      loadChildren: () => import('./delivery/delivery.module')
        .then(m => m.DeliveryModule),
    },
    {
      path: 'order',
      loadChildren: () => import('./order/order.module')
        .then(m => m.OrderModule),
    },
    {
      path: 'payment',
      loadChildren: () => import('./payment/payment.module')
        .then(m => m.PaymentModule),
    },
    {
      path: 'setting',
      loadChildren: () => import('./setting/setting.module')
        .then(m => m.SettingModule),
    },
    {
      path: 'businesses',
      loadChildren: () => import('./setting/businesses/businesses.module')
        .then(m => m.BusinessesModule),
    },
    {
      path: 'colour',
      loadChildren: () => import('./setting/colour/colour.module')
        .then(m => m.ColourModule),
    },
    {
      path: 'size',
      loadChildren: () => import('./setting/size/size.module')
        .then(m => m.SizeModule),
    },
    {
      path: 'status',
      loadChildren: () => import('./setting/status/status.module')
        .then(m => m.StatusModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessIndexComponent } from './business-index/business-index.component';
import { BusinessCreateUpdateComponent } from './business-create-update/business-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessIndexComponent,
    children: [
      {
        path: 'index',
        component: BusinessIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: BusinessCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: BusinessCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }

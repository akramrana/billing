import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SizeCreateUpdateComponent } from './size-create-update/size-create-update.component';
import { SizeIndexComponent } from './size-index/size-index.component';

const routes: Routes = [
  {
    path: '',
    component: SizeIndexComponent,
    children: [
      {
        path: 'index',
        component: SizeIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: SizeCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: SizeCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeRoutingModule { }

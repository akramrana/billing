import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColourCreateUpdateComponent } from './colour-create-update/colour-create-update.component';
import { ColourIndexComponent } from './colour-index/colour-index.component';

const routes: Routes = [
  {
    path: '',
    component: ColourIndexComponent,
    children: [
      {
        path: 'index',
        component: ColourIndexComponent,
      },
    ],
  },
  {
    path: 'create',
    component: ColourCreateUpdateComponent,
  },
  {
    path: 'update/:id',
    component: ColourCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColourRoutingModule { }

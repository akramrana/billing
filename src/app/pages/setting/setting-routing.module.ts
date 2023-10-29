import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingIndexComponent } from './setting-index/setting-index.component';

const routes: Routes = [
  {
    path: '',
    component: SettingIndexComponent,
    children: [
      {
        path: 'index',
        component: SettingIndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

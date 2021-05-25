import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KondisiAsetPage } from './kondisi-aset.page';

const routes: Routes = [
  {
    path: '',
    component: KondisiAsetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KondisiAsetPage]
})
export class KondisiAsetPageModule {}

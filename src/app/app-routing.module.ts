import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { PosComponent } from './components/pos/pos.component';

const routes: Routes = [
  { path: 'products', component: ProductManagementComponent },
  { path: 'pos', component: PosComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

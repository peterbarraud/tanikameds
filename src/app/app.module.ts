// core services
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ngx-bootstrap/ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';


// custom components
import { AppComponent } from './app.component';
import { SusiComponent } from './susi/susi.component';
import { AilmentComponent } from './ailment/ailment.component';
import { RailroadComponent } from './railroad/railroad.component';
import { CategoryComponent } from './category/category.component';
import { ProducttypeComponent } from './producttype/producttype.component';
import { DrugtypeComponent } from './drugtype/drugtype.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ProductComponent } from './product/product.component';
import { NotrackselectedComponent } from './notrackselected/notrackselected.component';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { ProductItemSelectComponent } from './productitemselect/productitemselect.component';
import { MultiProductItemsSlectComponent } from './multiproductitemselect/multiproductitemselect.component';
import { MultiItemGroupComponent } from './multiitemgroup/multiitemgroup.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

// custom services
import { RestService } from './rest.service';
import { AppUserService } from './app-user.service';

import { NoProductSelectedComponent } from './no-product-selected/no-product-selected.component';

import { FilterProductItemsPipe } from './filterproductitems.pipe';
import { ValorTableComponent } from './valor-table/valor-table.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { VendorComponent } from './vendor/vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    SusiComponent,
    AilmentComponent,
    RailroadComponent,
    CategoryComponent,
    ProducttypeComponent,
    DrugtypeComponent,
    ManufacturerComponent,
    ProductComponent,
    NotrackselectedComponent,
    ModaldialogComponent,
    ProductItemSelectComponent,
    MultiProductItemsSlectComponent,
    MultiItemGroupComponent,
    AdminUserComponent,
    NoProductSelectedComponent,
    FilterProductItemsPipe,
    ValorTableComponent,
    RegistrationFormComponent,
    VendorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    PaginationModule,
    TabsModule,
    Ng2TableModule,
    // NgbActiveModal,
    RouterModule.forRoot([
      {
        path: '', 
        component: SusiComponent,
      },
      {
        path: 'susi', 
        component: SusiComponent,
      },
      {
        path: 'product', 
        component: ProductComponent,
      },
      {
        path: 'ailment', 
        component: AilmentComponent,
      },
      {
        path: 'category', 
        component: CategoryComponent,
      },
      {
        path: 'producttype', 
        component: ProducttypeComponent,
      },
      {
        path: 'drugtype', 
        component: DrugtypeComponent,
      },
      {
        path: 'manufacturer', 
        component: ManufacturerComponent,
      },
      {
        path: 'adminuser', 
        component: AdminUserComponent,
      },
      {
        path: 'vendor', 
        component: VendorComponent,
      },
      {
        path: 'register', 
        component: RegistrationFormComponent,
      },
    ]
    )
  ],
  providers: [
    RestService,
    AppUserService,
    PaginationConfig
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

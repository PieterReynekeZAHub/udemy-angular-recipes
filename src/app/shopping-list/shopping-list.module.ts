import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


const appRoutes: Routes =[
  {path: '', component: ShoppingListComponent},
]
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports:[
    ShoppingEditComponent
  ],
  imports : [
    RouterModule.forChild(appRoutes),
    SharedModule,
    FormsModule
  ]
})
export class ShoppingListModule{}

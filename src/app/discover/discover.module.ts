import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ShortenPipe} from "../shared/shorten.pipe";
import {DiscoverListComponent} from "./discover-list/discover-list.component";
import {DiscoverComponent} from "./discover.component";
import {DiscoverItemComponent} from "./discover-item/discover-item.component";
import {DiscoverDetailComponent} from "./discover-detail/discover-detail.component";
import {RecipeStartComponent} from "../recipes/recipe-start/recipe-start.component";

const appRoutes: Routes =[
  {path: '', component: DiscoverComponent,
    children: [
      {path: '', component: RecipeStartComponent},
      {path: ':id', component: DiscoverDetailComponent}
    ]},
]
@NgModule({
  declarations: [
    DiscoverComponent,
    DiscoverListComponent,
    DiscoverItemComponent,
    DiscoverDetailComponent
  ],
  imports: [ RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
    SharedModule,
    ShortenPipe]
})
export class DiscoverModule{}

import {Component, EventEmitter, Output} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>()
  collapsed = true;

  constructor(private dataStore: DataStorageService) {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature)
  }

  onSaveData() {
    this.dataStore.storeRecipes();
  }

  onFetchData() {
   this.dataStore.fetchRecipes().subscribe();
  }
}

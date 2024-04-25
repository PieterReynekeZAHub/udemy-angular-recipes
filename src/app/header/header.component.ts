import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {map} from "rxjs/operators";
import * as authActions from "../auth/store/auth.actions";
import {fetchRecipes} from "../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() featureSelected = new EventEmitter<string>()
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStore: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(
      user =>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  onSaveData() {
    this.dataStore.storeRecipes();
  }

  onFetchData() {
    console.log("HEADER FETCHING DATA")
   this.store.dispatch(fetchRecipes())
  }

  onLogout(){
    this.store.dispatch(authActions.logout())
  }
}

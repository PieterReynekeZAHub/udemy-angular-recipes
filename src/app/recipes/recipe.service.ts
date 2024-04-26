import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {ADD_INGREDIENTS} from "../shopping-list/store/shopping-list.actions";
import * as fromRecipeActions from "./store/recipe.actions";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  myRecipesChanged = new Subject<Recipe[]>();
  otherRecipesChanged = new Subject<Recipe[]>();
  private _Empty = false;

  // private recipes: Recipe[] = [
  //   new Recipe('Pie-Se-Pizza',
  //     `Pizza Napoletana, also known as Neapolitan pizza.`,
  //     'https://www.publicdomainpictures.net/pictures/470000/nahled/pizza-italian-style.jpg',
  //     [
  //       {name: 'Cheese', amount: 20},
  //       {name: 'tomatoes', amount: 3},
  //       {name: 'salami', amount: 9}]),
  //   new Recipe('BC Burgers',
  //     'A mouthwatering burger with crispy bacon and melted cheese',
  //     'https://live.staticflickr.com/4059/4449825083_19f16cfd07_b.jpg',
  //     [{name: 'burger-buns', amount: 6},
  //       {name: 'patties', amount: 6},
  //       {name: 'tomatoes', amount: 3},
  //       {name: 'bacon', amount: 2},
  //     ])
  // ];
  private recipes: Recipe[] = [];
  private myRecipes: Recipe[] = [];
  private otherRecipes: Recipe[] = [];

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>){}


  getRecipes() {
    return this.recipes.slice();
  }

  getMyRecipes() {
    return this.myRecipes.slice();
  }

  getOtherRecipes() {
    return this.otherRecipes.slice();
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]) {

    this.store.dispatch({type: ADD_INGREDIENTS, value: ingredients})
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  getMyRecipe(index: number){
    return this.myRecipes[index];
  }

  getOtherRecipe(index: number){
    return this.otherRecipes[index];
  }

  addRecipe(recipe: Recipe){
    console.log("HERE!!")
    console.log("Before Updates: " , this.otherRecipes)
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    console.log("added UserID" + userId)
    recipe.userIds = [];
    recipe.userIds.push(userId);
    recipe.ownerId = userId;
    recipe.recipeId =  uuidv4();
    this.store.dispatch(fromRecipeActions.addRecipe({recipe: recipe}));

  }

  // deleteRecipe(index: string){
  //   const recipe = this.myRecipes[index];
  //   const userId = JSON.parse(localStorage.getItem('userData')).id;
  //   this.myRecipes.splice(index, 1);
  //   // loop through recipes and delete recipe with the id
  //   for (let i = 0; i < this.recipes.length; i++){
  //     if (this.recipes[i].recipeId === recipe.recipeId){
  //       //only delete if the recipe is owned by the user
  //       if(this.recipes[i].ownerId === userId){
  //         this.recipes.splice(i, 1);
  //         if(this.recipes.length === 0){
  //           this._Empty = true;
  //         }
  //       }else{
  //         this.recipes[i].userIds.splice(this.recipes[i].userIds.indexOf(userId), 1);
  //       }
  //       break;
  //     }
  //   }
  //   for (let i = 0; i < this.otherRecipes.length; i++) {
  //     if (this.otherRecipes[i].recipeId === recipe.recipeId) {
  //       this.otherRecipes[i].userIds.splice(this.otherRecipes[i].userIds.indexOf(JSON.parse(localStorage.getItem('userData')).id), 1);
  //       break;
  //     }
  //   }
  //   this.myRecipesChanged.next(this.myRecipes.slice())
  //   this.otherRecipesChanged.next(this.otherRecipes.slice())
  // }

  setRecipes(recipes: Recipe[]){
    console.log('set Recipe', recipes)
    // add recipes with the authenticated userID in the recipes lis otherwise add them to the otherRecipes list
    // this.recipes = recipes;
    // this.recipesChanged.next(this.recipes.slice())
    // console.log(recipes)
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    for (let recipe of recipes){
      if (recipe.userIds.includes(userData.id)){
        this.myRecipes.push(recipe)
      } else {
        this.otherRecipes.push(recipe)
      }
    }
    this.recipes = recipes;
    this.myRecipesChanged.next(this.myRecipes.slice());
    this.otherRecipesChanged.next(this.otherRecipes.slice());
  }

  clearMyRecipes(){
    this.myRecipes = [];
    this.recipes = [];
    this.otherRecipes = [];
    this.myRecipesChanged.next(this.myRecipes.slice());
    this.otherRecipesChanged.next(this.myRecipes.slice());
  }

  get isEmpty(){
    return this._Empty;
  }

  set isEmpty(value: boolean){
    this._Empty = value;
  }


}

import {Ingredient} from "../shared/ingredient.model";
import { v4 as uuidv4 } from 'uuid';


export class Recipe{
  public userIds: string[];
  public ownerId: string;
  public recipeId: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(userId: string, name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
    this.userIds = [];
    this.userIds.push(userId)
    this.ownerId = userId;
    this.recipeId = uuidv4();
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

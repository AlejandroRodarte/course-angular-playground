// recipe model
import { Ingredient } from 'src/app/shared/ingredient.model';

// a model is defined as a plain old object
export class Recipe {

    // Firebase id of the recipe
    public id: string;

    // the name of the recipe
    public name: string;

    // the description of the recipe
    public description: string;

    // path pointing to the recipe image (url)
    public imagePath: string;

    // array of ingredients
    public ingredients: Ingredient[];

    // regular constructor
    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }

}
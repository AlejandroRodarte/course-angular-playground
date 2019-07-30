// recipe model
// a model is defined as a plain old object
export class Recipe {

    // the name of the recipe
    public name: string;

    // the description of the recipe
    public description: string;

    // path pointing to the recipe image (url)
    public imagePath: string;

    constructor(name: string, description: string, imagePath: string) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }

}
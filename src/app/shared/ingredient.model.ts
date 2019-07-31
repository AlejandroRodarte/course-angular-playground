// ingredient model, plain old object
export class Ingredient {

    // name of the ingredient
    public name: string;

    // required amount of that ingredient
    public amount: number;

    // regular constructor
    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

}
import Nutritions from "./Nutritions";
import Units from './Units';
import EmptyFoodNameError from "./errors/EmptyFoodNameError";
import InvalidFoodAmountError from "./errors/InvalidFoodAmountError";

class Food {
    private currentValues: Nutritions;

    constructor(private readonly name: string, 
        private readonly unit: Units, 
        private readonly baseValues: Nutritions) {
        
            this.validateFoodName(name);
            this.validateFoodAmount(baseValues.amount);
            this.currentValues = {...baseValues};
    }

    private validateFoodAmount(amount: number) {
        if (amount <= 0) {
            throw new InvalidFoodAmountError(amount);
        }
    }

    private validateFoodName(name: string) {
        if (name.length === 0) {
            throw new EmptyFoodNameError();
        }
    }

    getName(): string {
        return this.name;
    }

    getUnit() {
        return this.unit;
    }

    getBaseValues() {
        return this.baseValues;
    }

    getCurrentValues() {
        return this.currentValues;
    }

    changeAmount(amount: number) {
        this.validateFoodAmount(amount)
        this.currentValues.amount = amount;
        this.calculateNutrients(['calories', 'fat', 'carbonhydrate', 'protein']);
    }

    changeCalories(calories: number) {
        this.currentValues.calories = calories;
        this.currentValues.amount  = this.calculateAmountFromNutrition('calories');
        this.calculateNutrients(['fat', 'carbonhydrate', 'protein']);
    }

    changeFat(fat: number) {
        this.currentValues.fat = fat;
        this.currentValues.amount = this.calculateAmountFromNutrition('fat');
        this.calculateNutrients(['calories', 'carbonhydrate', 'protein']);
    }

    changeProtein(protein: number) {
        this.currentValues.protein = protein;
        this.currentValues.amount = this.calculateAmountFromNutrition('protein');
        this.calculateNutrients(['fat', 'carbonhydrate', 'calories']);
    }
    changeCarbonhydrate(carbonhydrate: number) {
        this.currentValues.carbonhydrate = carbonhydrate;
        this.currentValues.amount = this.calculateAmountFromNutrition('carbonhydrate');
        this.calculateNutrients(['fat', 'protein', 'calories']);
    }

    private calculateNutrients(nutrients: string[]) {
        nutrients.forEach(nutrient => {
            this.currentValues[nutrient] = this.calculateNutritionFromAmount(nutrient);
        });
    }
    private calculateNutritionFromAmount(nutrition: string) {
        return Math.ceil(this.currentValues.amount * this.baseValues[nutrition] 
            / this.baseValues.amount);
    }
    private calculateAmountFromNutrition(nutrition: string) {
        return Math.ceil(this.currentValues[nutrition] * this.baseValues.amount
            / this.baseValues[nutrition]);
    }
}

export default Food;
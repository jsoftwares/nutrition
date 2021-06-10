# Nutrion calculator
Create Foods with base nutrition values, change one of the base nutrition values and have the other recalculate automatically.

## Installation

```
npm i @jeffonochie/nutrition
```

## Examples

```
import { Food, Nutritions, Units } from '@jeffonochie/nutrition';

const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };
const food = new Food('rice', Units.GRAM, baseValues);

// returns 'rice'
food.getName();

// returns 'g'
food.getUnit();

// changes food amount value and stores the result in currentValue.amount
// There are also other functions like cahngeCalories, changeFat, changeCarbonhydrate, changeProtein
food.changeAmount(23);

// get current nutritions value of rice
const { calories, amount, fat, carbonhydrate, protein } = food.getCurrentValues();

// get base nutrition values of rice
const { calories, amount, fat, carbonhydrate, protein } = food.getBaseValues();
```

## Error Handling
```
import { Food, Nutritions, Units, InvalidFoodAmountError } from '@jeffonochie/nutrition';
const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
};

try {
const food = new Food('rice', Units.GRAM, baseValues);
}catch( error ) {
    //error: InvalidFoodAmountError
}
```

Available error types:
- InvalidFoodAmountError -> if the amount of the baseValues is less than or equals zero or the changeAmount parameter is less than or equals zero
- EmptyFoodNameError -> if the first parameter is empty 

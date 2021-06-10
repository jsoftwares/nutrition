import Food from './Food';
import Units  from './Units';
import EmptyFoodNameError from './errors/EmptyFoodNameError'
import InvalidFoodAmountError from './errors/InvalidFoodAmountError'

describe('Food', () => {
    test('create new food object', () => {
        const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };
        const food = new Food('rice', Units.GRAM, baseValues);

        expect(food).toBeDefined();
        expect(food.getName()).toEqual('rice');
        expect(food.getUnit()).toEqual('g');
        expect(food.getBaseValues().amount).toEqual(100);
        expect(food.getBaseValues().fat).toEqual(30);
        expect(food.getBaseValues().carbonhydrate).toEqual(40);
        expect(food.getBaseValues().protein).toEqual(65);
        expect(food.getBaseValues().calories).toEqual(124);
    });

    test('create food with empty name', () => {
        const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };
        expect(() => {
            new Food('', Units.GRAM, baseValues)
        }).toThrowError(EmptyFoodNameError);
    });

    test('create food with zero amount', () => {
        const baseValues = {
            amount: 0,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };
        expect( () => { 
            new Food('banga soup', Units.GRAM, baseValues)
        }).toThrowError(InvalidFoodAmountError);
    });

    test('create food and change amount', () => {
        const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };

        const food = new Food('bean', Units.GRAM, baseValues);
        food.changeAmount(23);
        expect(food.getCurrentValues().amount).toEqual(23);
    });

    test('create food and change amount with negative number', () => {
        const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };

        const food = new Food('bean', Units.GRAM, baseValues);
        expect( () => { food.changeAmount(-23) }).toThrowError(InvalidFoodAmountError);
    });

    test('create food, change amount and calculate current values', () => {
        const baseValues = {
            amount: 100,
            fat: 30,
            carbonhydrate: 40,
            protein: 65,
            calories: 124
        };

        const food = new Food('bean', Units.GRAM, baseValues);
        food.changeAmount(87);
        expect(food.getCurrentValues().calories).toEqual(108); //ie (baseValues.calories * currentValues.amount)/baseValue.amount
        expect(food.getCurrentValues().fat).toEqual(27);
        expect(food.getCurrentValues().carbonhydrate).toEqual(35);
        expect(food.getCurrentValues().protein).toEqual(57);
    });

});

describe('create food and change values', () => {
    let food: Food;

    beforeEach( () => {
        const baseValues = {
            amount: 100,
            fat: 4,
            carbonhydrate: 450,
            protein: 1,
            calories: 130
        };

        food = new Food('bean', Units.GRAM, baseValues);
    });

    test('change calories and calculate current values', () => {
        food.changeCalories(211);

        const { calories, amount, fat, carbonhydrate, protein } = food.getCurrentValues();
        expect(calories).toEqual(211);
        expect(amount).toEqual(163);
        expect(fat).toEqual(7);
        expect(carbonhydrate).toEqual(734);
        expect(protein).toEqual(2);
    });

    test('change fat and calculate current values', () => {
        food.changeFat(20);

        const { calories, amount, fat, carbonhydrate, protein } = food.getCurrentValues();
        expect(fat).toEqual(20);
        expect(amount).toEqual(500);
        expect(calories).toEqual(650);
        expect(carbonhydrate).toEqual(2250);
        expect(protein).toEqual(5);
    });

    test('change protein and calculate current values', () => {
        food.changeProtein(103);

        const { calories, amount, fat, carbonhydrate, protein } = food.getCurrentValues();
        expect(protein).toEqual(103);
        expect(amount).toEqual(10300);  //(newProt/baseProt)*baseAmt
        expect(fat).toEqual(412);       //(newAmnt/baseAmnt)*baseFat
        expect(calories).toEqual(13390);
        expect(carbonhydrate).toEqual(46350);
    });

    test('change carbonhydrate and calculate current values', () => {
        food.changeCarbonhydrate(11);

        const { calories, amount, fat, carbonhydrate, protein } = food.getCurrentValues();
        expect(carbonhydrate).toEqual(11);
        expect(amount).toEqual(3);
        expect(protein).toEqual(1);
        expect(fat).toEqual(1);
        expect(calories).toEqual(4);
    });

})
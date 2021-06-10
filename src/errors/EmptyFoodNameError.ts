export default class EmptyFoodNameError extends Error {
    constructor(message: string = 'Name of Food cannot be empty') {
        super(message);
    }
}
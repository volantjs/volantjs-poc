import { Model } from "./model"

export abstract class DaoInterface<A, I> {
    protected model: Model<A, I>;

    /**
     * constructor initializes DaoInterface<A, I> by assigning
     * an instance of type Model<A, I> to the protector member
     * model.
     */
    constructor(model: Model<A, I>) {
        this.model = model;        
    }
}
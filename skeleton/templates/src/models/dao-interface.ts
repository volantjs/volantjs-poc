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

    /**
     * findAll returns all instances as an array of the entity  
     * or an empty array.
     */
    async findAll(): Promise<I[]> {
        return await this.model.findAll();
    }

    /**
     * findByIdfindById returns an entity instance identified by
     * id or null if the instance is not found.
     * @param id: Identifier of the entity instance.
     */
    async findByIdfindById(id: number | string): Promise<I | null> {
        return await this.model.findById(id);
    }

    /**
     * create method creates a new instance of the entity and returns
     * the newly craeted entity instance.
     * @param value: instance
     */
    async create(value: A): Promise<I> {
        return await this.model.create(value);
    }

    async upsert(value: A): Promise<boolean> {
        return await this.model.upsert(value);
    }

    async update(value: A): Promise<I[]> {
        return await this.model.update(value);
    }

    async delete(id: number | string): Promise<boolean> {
        return await this.model.delete(id);
    }
}
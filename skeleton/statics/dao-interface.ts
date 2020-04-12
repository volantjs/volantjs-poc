import { ModelInterface } from "./model-interface"

export abstract class DaoInterface<A, I> {
    protected model: ModelInterface<A, I>;

    /**
     * constructor initializes DaoInterface<A, I> by assigning
     * an instance of type Model<A, I> to the protector member
     * model.
     */
    constructor(model: ModelInterface<A, I>) {
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
     * findById returns an entity instance identified by
     * id or null if the instance is not found.
     * @param id: Identifier of the entity instance.
     */
    async findById(id: number | string): Promise<I | null> {
        return await this.model.findById(id);
    }

    /**
     * create method creates a new instance of the entity and returns
     * the newly craeted entity instance.
     * @param value: instance to be created
     */
    async create(value: A): Promise<I> {
        return await this.model.create(value);
    }

    /**
     * upsert method update and existing instace or crates a new instance
     * if an instance is not available with the identifier in value. 
     * @param value: instance to be updated or created.
     */
    async upsert(value: A): Promise<boolean> {
        return await this.model.upsert(value);
    }

    /**
     * update method updates an instance identifed by the identifier available
     * in the value.
     * @param value: instance to tbe updated. 
     */
    async update(value: A): Promise<I[]> {
        return await this.model.update(value);
    }

    /**
     * delete method is used to delete and instance identified by the
     * provided id.
     * @param id: identifier of the entity instance.
     */
    async delete(id: number | string): Promise<boolean> {
        return await this.model.delete(id);
    }
}
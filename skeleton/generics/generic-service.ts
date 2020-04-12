import { DaoInterface } from "../statics";

export abstract class GenericService<
  TDto extends { id?: number | undefined}, 
  TAttributes, 
  TInterface
> {
    protected repository: DaoInterface<TAttributes, TInterface>;

    /**
     * constructor initializes GenericService instance by assigning the
     * correct repository to query entities.
     */
    constructor(repository: DaoInterface<TAttributes, TInterface>) {
        this.repository = repository;
    }

    /**
     * getAll returns all instances as an array of the entity  
     * or an empty array.
     */
    public async getAll() {
      return await this.repository.findAll();
    }

    /**
     * getOneById returns an entity instance identified by
     * id or null if the instance is not found.
     * @param id Identifier of the entity instance.
     */
    public async getOneById(id: number | string) {
      return await this.repository.findById(id);
    }

    /**
     * create method creates a new instance of the entity and returns
     * the newly craeted entity instance.
     * @param newInstance instance to be created as a data transfer
     * object
     */
    public async create(newInstance: TDto) {
      const newRecord: TAttributes = ({ ...newInstance } as unknown) as TAttributes;
      return await this.repository.create(newRecord);
    }

    /**
     * upsert method update and existing instace or crates a new instance
     * if an instance is not available with the identifier in value. 
     * @param instance instance to be updated or created as a data
     * transfer object
     */
    public async upsert(instance: TDto) {
      const record: TAttributes = ({ ...instance } as unknown) as TAttributes;
      return await this.repository.upsert(record);
    }

    /**
     * update method updates an instance identifed by the identifier available
     * in the value.
     * @param instance instance to tbe updated
     */
    public async update(instance: TDto) {
      const record: TAttributes = ({ ...instance } as unknown) as TAttributes;
      return await this.repository.update(record);
    }

    /**
     * delete method is used to delete and instance identified by the
     * provided id.
     * @param id identifier of the entity instance
     */
    public async delete(id: number | string) {
      return await this.repository.delete(id);
    }
}
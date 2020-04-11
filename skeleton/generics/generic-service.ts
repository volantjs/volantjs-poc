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
}
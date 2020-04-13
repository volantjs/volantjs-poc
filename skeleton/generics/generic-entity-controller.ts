import { GenericEntityService } from "./generic-entity-service";

export abstract class GenericEntityController<
  TDto extends {id?: number | string | undefined},
  TAttributes,
  TInstance
> {
    protected service: GenericEntityService<TDto, TAttributes, TInstance>;

    /**
     *
     */
    constructor(service: GenericEntityService<TDto, TAttributes, TInstance>) {
      this.service = service;
    }
}
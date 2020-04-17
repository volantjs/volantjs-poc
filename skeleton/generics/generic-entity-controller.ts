import { Request, Response, NextFunction } from "express"
import { GenericEntityService } from "./generic-entity-service";

export abstract class GenericEntityController<
  TDto extends {id?: number | string | undefined},
  TAttributes,
  TInstance
> {
    protected service: GenericEntityService<TDto, TAttributes, TInstance>;

    /**
     * constructor instantiates a new instance of the EntityController.
     */
    constructor(service: GenericEntityService<TDto, TAttributes, TInstance>) {
      this.service = service;

      this.getAll = this.getAll.bind(this);
      this.getOneById = this.getOneById.bind(this);
      this.craete = this.craete.bind(this);
      this.update = this.update.bind(this);
      this.delete = this.delete.bind(this);
    }

    /**
     * getAll returns all instances as an array of the entity  
     * or an empty array.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
      const allRecords = await this.service.getAll();
      res.send(allRecords);
    }

    /**
     * getOneById returns an entity instance identified by
     * id or null if the instance is not found.
     */
    public async getOneById(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const record = await this.service.getOneById(id);

      if (record !== null) {
        res.send(record);
      } else {
        res.send({ message: `Record with ID ${id} is not found` });
      }
    }

    /**
     * create method creates a new instance of the entity and returns
     * the newly craeted entity instance.
     * object
     */
    public async craete(req: Request, res: Response, next: NextFunction) {
      const newRecord = req.body;
      const created = await this.service.create(newRecord);
      res.send(created);
    }

    /**
     * upsert method update and existing instace or crates a new instance
     * if an instance is not available with the identifier in value. 
     */
    public async upsert(req: Request, res: Response, next: NextFunction) {
      const newRecord = req.body;
      const created = await this.service.upsert(newRecord);
      res.send(created);
    }
    
    /**
     * update method updates an instance identifed by the identifier available
     * in the value.
     */
    public async update(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const edited = await this.service.update(req.body);

      if (edited !== null) {
        res.send(edited);
      } else {
        res.send({ message: `Record with ID ${id} is not found` });
      }
    }

    /**
     * delete method is used to delete and instance identified by the
     * provided id.
     */
    public async delete(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const deleted = await this.service.delete(id);
      res.statusCode = 204;
      res.send(deleted);
    }
}
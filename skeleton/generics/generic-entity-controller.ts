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

    public async getAll(req: Request, res: Response, next: NextFunction) {
      const allRecords = await this.service.getAll();
      res.send(allRecords);
    }

    public async getOneById(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const record = await this.service.getOneById(id);

      if (record !== null) {
        res.send(record);
      } else {
        res.send({ message: `Record with ID ${id} is not found` });
      }
    }

    public async craete(req: Request, res: Response, next: NextFunction) {
      const newRecord = req.body;
      const created = await this.service.create(newRecord);
      res.send(created);
    }

    public async update(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const edited = await this.service.update(req.body);

      if (edited !== null) {
        res.send(edited);
      } else {
        res.send({ message: `Record with ID ${id} is not found` });
      }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
      const id = Number.parseInt(req.params.id);
      const deleted = await this.service.delete(id);
      res.statusCode = 204;
      res.send(deleted);
    }
}
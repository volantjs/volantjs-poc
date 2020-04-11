export interface ModelInterface<Attributes, Instance> {

    findAll(): Promise<Instance[]>;

    findById(id: number | string): Promise<Instance | null>;

    create(value: Attributes): Promise<Instance>;

    upsert(value: Attributes): Promise<boolean>;

    update(value: Attributes): Promise<Instance[]>;

    delete(id: number | string): Promise<boolean>;
}
import {
  ICollection,
  IRepository,
  IResource,
} from '../__types__';

import ParameterBag from './ParameterBag';

/**
 * A Collection is a managed way of working with a list of resources
 * It is connected to a Repository to fetch data
 */
export default class Collection<T> implements ICollection<T> {
  name: string;
  type: string;
  repository?: IRepository<T>;
  data: IResource<T>[] = [];
  parameterBag: ParameterBag;

  constructor(name: string, type: string, repository?: IRepository<T>, parameterBag = new ParameterBag()) {
    this.name = name;
    this.type = type;
    this.repository = repository;
    this.parameterBag = parameterBag;
  }

  get length(): number {
    return this.data.length;
  }

  get items(): IResource<T>[] {
    return this.data;
  }

  async load(): Promise<void> {
    if (!this.repository) {
      throw new Error(`No repository was present in collection ${this.name}`);
    }

    this.data = await this.repository.find(this.parameterBag);
  }
}

export type Relationships = Record<string, { resource: string; cardinality: string; many?: boolean; }>;

/**
 * A Resource defines a single item / entity from the backend
 */
export default class Resource<T> {
  id: string | number | null;
  type: string;
  data: T;
  relationships: Relationships;
  meta?: Record<string, any>;

  constructor(
    id: string | number | null,
    type: string,
    data?: T,
    relationships?: Relationships | null,
    meta?: Record<string, any>,
  ) {
    this.id = id;
    this.type = type;
    this.data = data || ({} as T);
    this.relationships = relationships || {};
    this.meta = meta;
  }
}

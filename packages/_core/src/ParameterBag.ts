export type Filter = { field: string, value: string };
export type Sorting = { field: string, direction?: 'asc' | 'desc' };
export type Paging = Record<string, unknown>;
export type Params = Record<string, unknown>;

/**
 * All information for a request to the backend that is not a resource is contained in a parameterBag
 */
export default class ParameterBag {
  filters: Filter[];
  sorting: Sorting[];
  paging: Record<string, unknown>;
  params: Record<string, unknown>;

  constructor(
    filters: Filter[] = [],
    sorting: Sorting[] = [],
    paging = {},
    params = {},
  ) {
    this.filters = filters;
    this.sorting = sorting;
    this.paging = paging;
    this.params = params;
  }

  static toString(parameterBag: ParameterBag) {
    return JSON.stringify(parameterBag);
  }

  static fromString(string: string) {
    return JSON.parse(string) as ParameterBag;
  }

  addFilter(filter: Filter) {
    this.filters.push(filter);
  }

  setFilters(filters: Filter[]) {
    this.filters = filters;
  }

  setSorting(sorting: Sorting[]) {
    this.sorting = sorting.map(({ field, direction }) => ({
      field,
      direction: direction || 'asc',
    }));
  }

  setPaging(paging: Record<string, unknown>) {
    this.paging = paging;
  }

  addParam(key: string, value: unknown) {
    this.params = { ...this.params, [key]: value };
  }

  setParams(params: Record<string, unknown>) {
    this.params = params;
  }
}

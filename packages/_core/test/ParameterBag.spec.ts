import ParameterBag, {
  Filter, Paging, Params, Sorting,
} from '../src/ParameterBag';

describe('ParameterBag', () => {
  let params: Params;
  let filters: Filter[];
  let paging: Paging;
  let sorting: Sorting[];

  beforeEach(() => {
    params = { key1: 'value1', key2: 'value2' };
    filters = [{ field: 'f1', value: 'v1' }];
    paging = { offset: 0 };
    sorting = [{ field: 'f1', direction: 'asc' }];
  });

  test('that it is initialized with default empty values', () => {
    const parameterBag = new ParameterBag();

    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  test('that it can be initialized with the contructor', () => {
    const parameterBag = new ParameterBag([], [], {}, {});

    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  test('that two instances do not share data', () => {
    const parameterBag = new ParameterBag();
    const parameterBag2 = new ParameterBag();

    parameterBag.setFilters([{ field: 'f1', value: 'v1' }]);

    expect(parameterBag.filters).not.toEqual(parameterBag2.filters);
  });

  test('that it contains setters and getters for filters, paging, sorting and params', () => {
    const parameterBag = new ParameterBag();

    parameterBag.setFilters(filters);
    parameterBag.setParams(params);
    parameterBag.setPaging(paging);
    parameterBag.setSorting(sorting);

    expect(parameterBag.filters).toEqual(filters);
    expect(parameterBag.params).toEqual(params);
    expect(parameterBag.paging).toEqual(paging);
    expect(parameterBag.sorting).toEqual(sorting);

    const extraFilter = { field: 'f2', value: 'v2' };
    filters.push(extraFilter);

    parameterBag.addFilter(extraFilter);
    expect(parameterBag.filters).toEqual(filters);

    parameterBag.addParam('key3', 'value3');
    expect(parameterBag.params.key3).toEqual('value3');
  });

  test('that an attribute is set after setting any parameter', () => {
    const parameterBagSetFilters = new ParameterBag();
    expect(parameterBagSetFilters.filters).toEqual([]);
    parameterBagSetFilters.setFilters(filters);
    expect(parameterBagSetFilters.filters).toEqual(filters);

    const parameterBagAddFilter = new ParameterBag();
    expect(parameterBagAddFilter.filters).toEqual([]);
    parameterBagAddFilter.addFilter(filters[0]);
    expect(parameterBagAddFilter.filters).toEqual(filters);

    const parameterBagSetSorting = new ParameterBag();
    expect(parameterBagSetSorting.sorting).toEqual([]);
    parameterBagSetSorting.setSorting(sorting);
    expect(parameterBagSetSorting.sorting).toEqual([{ field: sorting[0].field, direction: 'asc' }]);

    const parameterBagSetPaging = new ParameterBag();
    expect(parameterBagSetPaging.paging).toEqual({});
    parameterBagSetPaging.setPaging(paging);
    expect(parameterBagSetPaging.paging).toEqual(paging);

    const parameterBagSetParams = new ParameterBag();
    expect(parameterBagSetParams.params).toEqual({});
    parameterBagSetParams.setParams(params);
    expect(parameterBagSetParams.params).toEqual(params);

    const newParams = { key3: 'value3' };
    const parameterBagAddParam = new ParameterBag();
    expect(parameterBagAddParam.params).toEqual({});
    parameterBagAddParam.addParam('key3', 'value3');
    expect(parameterBagAddParam.params).toEqual(newParams);
  });

  test('that the parameterbag can be converted to and from a string', () => {
    const parameterBag = new ParameterBag(filters, sorting, paging, params);

    const string = ParameterBag.toString(parameterBag);

    expect(ParameterBag.fromString(string)).toEqual(parameterBag);
  });
});

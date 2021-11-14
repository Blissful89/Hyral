import Resource, { Relationships } from '../src/Resource';

describe('Resource', () => {
  let id: number;
  let type: string;
  let data: unknown;
  let relationships: Relationships;
  // let meta: Record<string, any>;

  beforeEach(() => {
    id = 1;
    type = 'product';
    data = { item: 'property' };
    relationships = { author: { resource: 'author', cardinality: 'many-to-one' } };
    // meta = {};
  });

  test('that the resource is correctly initialized', () => {
    const resource1 = new Resource(id, type);

    expect(resource1.id).toEqual(id);
    expect(resource1.data).toEqual({});
    expect(resource1.relationships).toEqual({});

    const resource2 = new Resource(id, type, data);
    expect(resource2.data).toEqual(data);
    expect(resource2.relationships).toEqual({});

    const resource3 = new Resource(id, type, data, relationships);
    expect(resource3.data).toEqual(data);
    expect(resource3.relationships).toEqual(relationships);
  });

  test('that a resource can be created with relationships', () => {
    const resource1 = new Resource(id, type, data);
    const resource2 = new Resource(1, 'book', resource1, relationships);

    expect(resource2.data).toEqual(resource1);
    expect(resource2.relationships).toHaveProperty('author');
    expect(resource2.relationships?.author.resource).toEqual('author');
  });

  test('that the relationships for a resource can be updated', () => {
    const book = new Resource(id, type, data);

    book.relationships = { author: { resource: 'author', cardinality: 'many-to-one' } };

    expect(book.relationships).toHaveProperty('author');
    expect(book.relationships.author.resource).toEqual('author');
  });
});

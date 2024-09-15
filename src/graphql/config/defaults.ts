const defaultEndPoint = 'https://rickandmortyapi.com/graphql';
const defaultQuery = `
  query characters($name: String){
    characters(page: 3, filter: { name: $name }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

const defaultHeaders = [
  {
    key: 'Content-Type',
    value: 'application/json; charset=UTF-8',
  },
];

const defaultVariables = [
  {
    key: 'name',
    value: 'Rick',
  },
];

export default { defaultEndPoint, defaultQuery, defaultHeaders, defaultVariables };

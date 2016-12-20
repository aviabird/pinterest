// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // apiEndpoint: 'https://pinwork-api.herokuapp.com/api/',
  // socketEndpoint: 'wss://pinwork-api.herokuapp.com',
  apiEndpoint: 'http://localhost:4000/api/',
  socketEndpoint: 'ws://localhost:4000',
  basic_auth_token: btoa('api:password')
};

import { environment } from '../environments/environment';

export const ApiUrl = {
  auth_path: url("/users/auth"),
  users_path: (id='') => url('/users/' + id),
  pins_path: url("/pins"),
}

function url(path) {
  return environment.apiEndpoint + path;
}
interface HasuraClaims {
  'x-hasura-allowed-roles': string[];
  'x-hasura-default-role': string;
  'x-hasura-user-id': number;
}

export interface JwtPayload {
  email: string;
  roles: string[] | undefined;
  'https://hasura.io/jwt/claims': HasuraClaims;
}

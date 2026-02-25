export type TypeJWTPayload = {
  id: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

declare namespace Express {
  interface Request extends csrf {}
}

interface csrf {
  csrfToken(): string;
}

declare module "lusca";

export interface ICreateUserInput {
  email: string;
  username?: string | null;
  name?: string | null;
}

export interface IUpdateUserInput {
  email?: string;
  username?: string | null;
  name?: string | null;
}

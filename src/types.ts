import { RouterContext } from "https://deno.land/x/oak/mod.ts";

interface IUser {
  id: string;
  name: string;
  middleName: string;
  age: number;
}

export { IUser, RouterContext };

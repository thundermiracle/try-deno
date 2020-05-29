import { Status } from "https://deno.land/x/oak/mod.ts";

import { RouterContext, IUser } from "../types.ts";
import getNextId from "../utils/getNextId.ts";
import DBUsers from "../../DB/users.ts";

export function getUsers({ response }: RouterContext) {
  response.body = {
    success: true,
    data: DBUsers,
  };
}

export function getUser({ response, params }: RouterContext) {
  const user = DBUsers.find((user) => user.id === params.id);
  if (user) {
    response.body = {
      success: true,
      data: user,
    };
  } else {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: "Not Found",
    };
  }
}

export async function updUser({ response, request, params }: RouterContext) {
  const userInd = DBUsers.findIndex((user) => user.id === params.id);
  if (request.hasBody && userInd > -1) {
    // body.type MUST be json
    // update all contents without id
    const { id, ...restUpdUser }: IUser = (await request.body()).value;

    DBUsers[userInd] = {
      ...DBUsers[userInd],
      ...restUpdUser,
    };

    response.status = Status.OK;
    response.body = {
      success: true,
      data: DBUsers[userInd],
    };
  } else {
    response.status = Status.BadRequest;
    response.body = {
      success: false,
      msg: "No Input",
    };
  }
}

export function delUser({ response, params }: RouterContext) {
  const userInd = DBUsers.findIndex((user) => user.id === params.id);
  if (userInd < 0) {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: "Not Found",
    };
  } else {
    DBUsers.splice(userInd, 1);
    response.body = {
      success: true,
    };
  }
}

export async function addUser({ response, request }: RouterContext) {
  if (request.hasBody) {
    // body.type MUST be json
    const addedUser: IUser = (await request.body()).value;
    addedUser.id = getNextId(DBUsers.map((user) => user.id));

    DBUsers.push(addedUser);

    response.status = Status.OK;
    response.body = {
      success: true,
      data: addedUser,
    };
  } else {
    response.status = Status.BadRequest;
    response.body = {
      success: false,
      msg: "No Input",
    };
  }
}

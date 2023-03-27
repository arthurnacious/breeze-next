import { getSession } from "next-auth/react";
import { GraphQLClient } from "graphql-request";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

async function middleware(request: RequestInit) {
  const session = await getSession();

  if (session) {
    return {
      ...request,
      headers: {
        ...request.headers,
        authorization: `Bearer ${session.token}`,
      },
    };
  }

  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: `Bearer null`,
    },
  };
}

// @ts-ignore

export const client = new GraphQLClient(`${url}/graphql`, {
  // @ts-ignore
  requestMiddleware: middleware,
});

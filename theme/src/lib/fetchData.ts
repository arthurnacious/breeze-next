import { getSession } from "next-auth/react";
import { request } from "graphql-request";
import { DocumentNode } from "graphql/language";
import Axios from "axios";

//This lib can only be used Client side. Will fail on server side.
// This lib is not necessary unless you need to fine tune your fetch as codegen supplies a typed hook.

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const getRequestHeaders = async () => {
  const session = await getSession();
  return;
  `Bearer ${session.token}`;
};

const fetchData = async (query, variables = {}) => {
  const session = await getSession();
  const requestHeaders = {
    authorization: `Bearer ${session.token}`,
  };
  return await request(`${url}/graphql`, query, variables, requestHeaders);
};

const getData = async (
  query: DocumentNode,
  dataName,
  variables: Object = {}
) => {
  const data = await fetchData(query, variables);
  return data[dataName];
};

const fetchClient = async () => {
  Axios.create({
    baseURL: url,
    headers: {
      // @ts-ignore
      Authorization: await getRequestHeaders(),
    },
  });
};

export default getData;

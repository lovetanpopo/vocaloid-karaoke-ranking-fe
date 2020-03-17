import React from "react";
import express from "express";
import path from "path";
import ApolloClient from "apollo-client";
import { gql } from "apollo-boost";
import fetch from "isomorphic-fetch";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RootState } from "./components/types";
import { renderToString } from "react-dom/server";
import Top from "./components/pages/Top";

const server = express();
server
  .disable("x-powered-by")
  .use("/static", express.static(path.join(path.resolve('./'), "/dist/static")))
  .use("/robots.txt", express.static(path.join(path.resolve('./'), "/dist/robots.txt")))
  .get("/", async (req, res) => {
    const client = new ApolloClient({
      link: createHttpLink({
        uri: "https://vocaloid-karaoke-ranking-api.azurewebsites.net/",
        fetch: fetch,
        headers: {
          Authorization: process.env.AUTHORIZATION
        }
      }),
      cache: new InMemoryCache()
    });
    const ranking: RootState = await client
      .query({
        query: gql`
          {
            ranking {
              title
              author
              rank
            }
          }
        `
      })
      .then(result => result.data)
      .catch(err => console.log(err));

    res.write("<!DOCTYPE html>");
    res.write(renderToString(<Top preloadSate={ranking} />));
    res.end();
  });

export default server;

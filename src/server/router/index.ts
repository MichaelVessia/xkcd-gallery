// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { xkcdRouter } from "./xkcd";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("xkcd.", xkcdRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

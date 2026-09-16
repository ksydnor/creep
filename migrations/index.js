// Applied automatically in production (see payload.config.js). After a schema
// change: npm run migrate:create -- <name>, rename the generated .ts to .js,
// drop its type annotations, and add it here.
import * as initial from "./20260916_030840_initial.js";

export const migrations = [{ name: "20260916_030840_initial", up: initial.up, down: initial.down }];

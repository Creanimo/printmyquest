import {
  Roarr as log,
} from "roarr";

import {
  createLogWriter,
} from '@roarr/browser-log-writer';

globalThis.ROARR = globalThis.ROARR ?? {};
globalThis.ROARR.write = createLogWriter();

export { log };

import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../features/auth/infra/auth";

export const { POST, GET } = toNextJsHandler(auth);

import { TRPCError, initTRPC } from "@trpc/server";
import { cache } from "react";
import { authGateway } from "../../gateway/authGateway";

export const createTRPCContext = cache(async () => {
  const authUser = await authGateway.getUser();
  return {
    authUser,
  };
});

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.authUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      authUser: ctx.authUser,
    },
  });
});

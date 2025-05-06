import { authClient } from "../infrastructure/auth/authClient";

export const authGateway = {
  getUser: async () => {
    const supabaseUser = await authClient.getUser();
    return supabaseUser
      ? {
          userId: supabaseUser.id,
        }
      : null;
  },
};

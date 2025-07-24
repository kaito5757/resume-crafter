import type { AuthError } from "../../../shared/error";
import type { ResultAsync } from "../../../shared/result";
import type { SignInInput, SignUpInput, User } from "../model/types";
import { signInWorkflow, signUpWorkflow } from "../workflow/authWorkflow";

export const authUseCase = {
	signIn: (input: SignInInput): ResultAsync<User, AuthError> =>
		signInWorkflow(input),
	signUp: (input: SignUpInput): ResultAsync<User, AuthError> =>
		signUpWorkflow(input),
};

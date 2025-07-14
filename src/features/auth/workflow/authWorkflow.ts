import { fromPromise, ResultAsync } from "neverthrow";
import { AuthError } from "../../../shared/error";
import { auth } from "../infra/auth";
import type { SignInInput, SignUpInput, User } from "../model/types";

export const signUpWorkflow = (
	input: SignUpInput,
): ResultAsync<User, AuthError> => {
	return fromPromise(
		auth.api.signUpEmail({
			body: {
				name: "",
				email: input.email,
				password: input.password,
			},
		}),
		(error: unknown) => new AuthError(`${error}`),
	).andThen((response) => {
		if (response.token) {
			return ResultAsync.fromSafePromise(
				Promise.resolve({
					id: response.user.id,
					name: response.user.name,
					email: response.user.email,
					emailVerified: response.user.emailVerified,
					image: response.user.image,
					createdAt: new Date(response.user.createdAt),
					updatedAt: new Date(response.user.updatedAt),
				} as User),
			);
		}
		return ResultAsync.fromSafePromise(
			Promise.reject(new AuthError("サインアップに失敗しました")),
		);
	});
};

export const signInWorkflow = (
	input: SignInInput,
): ResultAsync<User, AuthError> => {
	return fromPromise(
		auth.api.signInEmail({
			body: {
				email: input.email,
				password: input.password,
			},
		}),
		(error) => new AuthError(`サインインに失敗しました: ${error}`),
	).andThen((response) => {
		if (response.token) {
			return ResultAsync.fromSafePromise(
				Promise.resolve({
					id: response.user.id,
					name: response.user.name,
					email: response.user.email,
					emailVerified: response.user.emailVerified,
					image: response.user.image,
					createdAt: new Date(response.user.createdAt),
					updatedAt: new Date(response.user.updatedAt),
				} as User),
			);
		}
		return ResultAsync.fromSafePromise(
			Promise.reject(new AuthError("サインインに失敗しました")),
		);
	});
};

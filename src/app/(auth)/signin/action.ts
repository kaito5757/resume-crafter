"use server";

import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { signInSchema } from "../../../features/auth/model/schema";
import { authUseCase } from "../../../features/auth/useCase/authUseCase";

export type SignInState = {
	error?: string;
	fieldErrors?: {
		email?: string[];
		password?: string[];
	};
};

export async function signInAction(
	_: unknown,
	formData: FormData,
): Promise<SubmissionResult<string[]>> {
	const submission = parseWithZod(formData, {
		schema: signInSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}

	const result = await authUseCase.signIn(submission.value);

	if (result.isErr()) {
		return submission.reply({
			formErrors: [result.error.message],
		});
	}

	redirect("/");
}

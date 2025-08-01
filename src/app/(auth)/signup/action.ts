"use server";

import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { signUpSchema } from "../../../features/auth/model/schema";
import { authUseCase } from "../../../features/auth/useCase/authUseCase";

export async function signUpAction(
	_: unknown,
	formData: FormData,
): Promise<SubmissionResult<string[]>> {
	const submission = parseWithZod(formData, {
		schema: signUpSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}

	const result = await authUseCase.signUp(submission.value);

	if (result.isErr()) {
		return submission.reply({
			formErrors: [result.error.message],
		});
	}

	redirect("/");
}

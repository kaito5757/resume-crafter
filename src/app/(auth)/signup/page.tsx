"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState } from "react";
import { signUpSchema } from "@/features/auth/model/schema";
import { signUpAction } from "./action";

export default function SignUp() {
	const [lastResult, action, isPending] = useActionState(
		signUpAction,
		undefined,
	);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: signUpSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6 text-center">サインアップ</h1>
			{lastResult?.error && (
				<div className="space-y-2 mb-4">
					{Object.entries(lastResult.error).map(
						([field, errors]) =>
							errors && (
								<div key={field} className="text-red-600 text-sm">
									{field}: {errors.join(", ")}
								</div>
							),
					)}
				</div>
			)}
			<form
				id={form.id}
				onSubmit={form.onSubmit}
				action={action}
				noValidate
				className="space-y-4"
			>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						メールアドレス
					</label>
					<input
						type="email"
						key={fields.email.key}
						name={fields.email.name}
						defaultValue={fields.email.initialValue}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
					<p className="mt-1 text-sm text-red-600">{fields.email.errors}</p>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						パスワード（8文字以上）
					</label>
					<input
						type="password"
						key={fields.password.key}
						name={fields.password.name}
						defaultValue={fields.password.initialValue}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
					<p className="mt-1 text-sm text-red-600">{fields.password.errors}</p>
				</div>
				<button
					type="submit"
					disabled={isPending}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{isPending ? "サインアップ中..." : "サインアップ"}
				</button>
			</form>
			<p className="mt-4 text-center text-sm text-gray-600">
				既にアカウントをお持ちの方は
				<Link href="/signin" className="text-blue-600 hover:text-blue-500">
					サインイン
				</Link>
			</p>
		</div>
	);
}

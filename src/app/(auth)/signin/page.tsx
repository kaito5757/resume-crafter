"use client";

import { useActionState } from "react";
import { signInAction } from "./action";

export default function SignIn() {
	const [state, action, isPending] = useActionState(signInAction, null);

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6 text-center">サインイン</h1>
			{state?.error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
					{state.error}
				</div>
			)}
			<form action={action} className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						メールアドレス
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
					{state?.fieldErrors?.email && (
						<p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
					)}
				</div>
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						パスワード
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
					{state?.fieldErrors?.password && (
						<p className="mt-1 text-sm text-red-600">{state.fieldErrors.password}</p>
					)}
				</div>
				<button
					type="submit"
					disabled={isPending}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{isPending ? "サインイン中..." : "サインイン"}
				</button>
			</form>
			<p className="mt-4 text-center text-sm text-gray-600">
				アカウントをお持ちでない方は{" "}
				<a href="/signup" className="text-blue-600 hover:text-blue-500">
					サインアップ
				</a>
			</p>
		</div>
	);
}
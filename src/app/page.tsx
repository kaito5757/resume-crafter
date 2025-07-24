import { headers } from "next/headers";
import { auth } from "@/features/auth/infra/auth";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	console.log(session);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">ログインチェック</h1>
				{session?.user ? (
					<div>
						<p className="text-green-600 mb-2">✅ ログイン中</p>
						<p className="text-sm text-gray-700">
							ユーザー: {session.user.email}
						</p>
					</div>
				) : (
					<div>
						<p className="text-red-600 mb-4">❌ ログインしていません</p>
						<div className="space-x-4">
							<a
								href="/signin"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
							>
								ログイン
							</a>
							<a
								href="/signup"
								className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
							>
								新規登録
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

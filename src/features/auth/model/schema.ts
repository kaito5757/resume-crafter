import { z } from "zod";

export const signUpSchema = z.object({
	email: z
		.string()
		.min(1, "メールアドレスは必須です")
		.email("有効なメールアドレスを入力してください"),
	password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, "メールアドレスは必須です")
		.email("有効なメールアドレスを入力してください"),
	password: z.string().min(1, "パスワードは必須です"),
});

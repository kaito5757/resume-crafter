'use server';

import { redirect } from 'next/navigation';
import { signInSchema } from '../../../features/auth/model/schema';
import { signInUseCase } from '../../../features/auth/usecase/signIn';

export type SignInState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function signInAction(
  prevState: SignInState | null,
  formData: FormData
): Promise<SignInState> {
  const rawInput = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Zodでバリデーション
  const parseResult = signInSchema.safeParse(rawInput);
  
  if (!parseResult.success) {
    const fieldErrors: SignInState['fieldErrors'] = {};
    parseResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignInState['fieldErrors'];
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field]!.push(issue.message);
    });
    return { fieldErrors };
  }

  // ユースケース実行
  const result = await signInUseCase(parseResult.data);
  
  if (result.isOk()) {
    redirect('/');
  }
  
  return {
    error: result.error.message,
  };
}
import type { SignUpInput, User } from '../model/types';
import type { AuthError } from '../../../shared/error';
import type { ResultAsync } from '../../../shared/result';
import { signUpWorkflow } from '../workflow/authWorkflow';

export const signUpUseCase = (input: SignUpInput): ResultAsync<User, AuthError> =>
  signUpWorkflow(input);
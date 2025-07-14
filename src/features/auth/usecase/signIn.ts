import type { SignInInput, User } from '../model/types';
import type { AuthError } from '../../../shared/error';
import type { ResultAsync } from '../../../shared/result';
import { signInWorkflow } from '../workflow/authWorkflow';

export const signInUseCase = (input: SignInInput): ResultAsync<User, AuthError> =>
  signInWorkflow(input);
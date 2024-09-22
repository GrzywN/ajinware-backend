import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Coaster from '../../entites/coaster.entity.ts';
import RegisterCoasterUseCase from '../../usecases/coaster/register-coaster.usecase.ts';
import { inject } from '../../utils/service-locator.ts';

export const registerCoaster = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const registerCoasterUseCase = inject(RegisterCoasterUseCase);

  const coaster = Coaster.fromJSON(req.body);
  const response = await registerCoasterUseCase.execute(coaster);

  res.json(response);
});

export default registerCoaster;

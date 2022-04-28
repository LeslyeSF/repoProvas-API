/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/extensions
import { Tests } from '.prisma/client';

export type createTestsData = Omit<Tests, 'id'>;

import { z } from 'zod';
import { modes, colorCombos } from './colors.js';

export const goalQuerySchema = z.object({
  mode: z.enum(Object.keys(modes)),
  dotSize: z.coerce.number().int().min(15).max(25).default(18),
  dotColor: z.enum(Object.keys(colorCombos)),
  endDate: z.iso.date().pipe(z.coerce.date()),
  startDate: z.iso.date().pipe(z.coerce.date()),
  text: z.string().max(50),
  position: z.enum(['top', 'middle', 'bottom']).default('middle'),
  gridPosition: z.enum(['top', 'middle', 'bottom']).default('middle'),
}).refine(q => q.startDate < q.endDate, {
  message: 'startDate must be before endDate',
});

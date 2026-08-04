import { z } from 'zod';
import { modes, colorCombos } from './colors.js';
import { DOT_SIZE } from './constants.js';

export const goalQuerySchema = z.object({
  mode: z.enum(Object.keys(modes)),
  dotSize: z.coerce.number().int().min(DOT_SIZE.min).max(DOT_SIZE.max).default(DOT_SIZE.default),
  dotColor: z.enum(Object.keys(colorCombos)),
  startDate: z.iso.date({message: "Start date is required"}).pipe(z.coerce.date()),
  endDate: z.iso.date({message: "End date is required"}).pipe(z.coerce.date()),
  text: z.string().max(50).min(1, {message: "Goal text can't be empty"}),
  position: z.enum(['top', 'middle', 'bottom']).default('middle'),
  gridPosition: z.enum(['top', 'middle', 'bottom']).default('middle'),
}).refine(q => q.startDate < q.endDate, {
  message: 'startDate must be before endDate',
})
.refine(q => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return q.endDate > today
}, {
  message: 'endDate must be after today',
  path: ['endDate'],
});

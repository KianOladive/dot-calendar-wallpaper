import { z } from 'zod';
import { modes, colorCombos } from './colors.js';
import { DOT_SIZE } from './constants.js';

export const baseQuerySchema = z.object({
  mode: z.enum(Object.keys(modes)),
  dotSize: z.coerce.number().int().min(DOT_SIZE.min).max(DOT_SIZE.max).default(DOT_SIZE.default),
  dotColor: z.enum(Object.keys(colorCombos)),
  layout: z.coerce.number().pipe(z.union([z.literal(1), z.literal(2)])).default(1),
  gridPosition: z.enum(['top', 'middle', 'bottom']).default('middle'),
  timezone: z.string().optional(),
}).strict();

export const monthQuerySchema = baseQuerySchema.extend({
  offset: z.coerce.number().int().optional(),
});

export const goalQuerySchema = baseQuerySchema.extend({
  startDate: z.iso.date({message: "Start date is required"}).pipe(z.coerce.date()),
  endDate: z.iso.date({message: "End date is required"}).pipe(z.coerce.date()),
  text: z.string().max(50).min(1, {message: "Goal text can't be empty"}),
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

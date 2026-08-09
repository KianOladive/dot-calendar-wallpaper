import buildGoalPng from '../services/image-builder.js';
import { getDotCounts } from '@goalcal/core';

export default async function getGoalImage(req, res, next) {
  try {
    const { mode, dotColor, dotSize, endDate, startDate, text, layout, gridPosition, timezone } = req.validatedQuery;
    const { dotCount, highlightedDotCount } = getDotCounts(startDate, endDate, timezone)
    const png = await buildGoalPng({ mode, dotColor, dotCount, highlighted: highlightedDotCount, dotSize, text, layout, gridPosition });
    res.set('Content-Type', 'image/png');
    res.send(png);
  }
  catch (err) {
    next(err)
  }
}

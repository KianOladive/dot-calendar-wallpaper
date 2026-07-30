import buildGoalPng from '../services/image-builder.js';
import { getDotCounts } from '@goalcal/core';

export default async function getGoalImage(req, res, next) {
  try {
    const { mode, dotColor, dotSize, endDate, startDate, text, position, gridPosition } = req.validatedQuery;
    const { dotCount, highlightedDotCount } = getDotCounts(startDate, endDate)
    const png = await buildGoalPng({ mode, dotColor, dotCount, highlighted: highlightedDotCount, dotSize, text, position, gridPosition });
    res.set('Content-Type', 'image/png');
    res.send(png);
  }
  catch (err) {
    next(err)
  }
}

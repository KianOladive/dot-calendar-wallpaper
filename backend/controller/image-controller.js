import buildGoalPng from '../services/image-builder.js';
import { getDotCounts, getMonthDotCounts } from '@goalcal/core';

export async function getGoalImage(req, res, next) {
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

export async function getMonthImage(req, res, next) {
  try {
    const { mode, dotColor, dotSize, layout, gridPosition, timezone } = req.validatedQuery;
    const { dotCount, highlightedDotCount, offset, monthName } = getMonthDotCounts(timezone)
    const cols = 7;
    const png = await buildGoalPng({ mode, dotColor, dotCount, highlighted: highlightedDotCount, dotSize, text: monthName, layout, gridPosition, offset, cols });
    res.set('Content-Type', 'image/png');
    res.send(png);
  }
  catch (err) {
    next(err)
  }
}

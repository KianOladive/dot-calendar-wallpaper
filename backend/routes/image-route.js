import express from 'express';
import { getGoalImage, getMonthImage } from '../controller/image-controller.js'
import { goalQuerySchema, monthQuerySchema } from '@goalcal/core';

const router = express.Router();

function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        message: 'invalid query parameters',
        errors: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`),
      });
    }
    req.validatedQuery = result.data;
    next();
  }
}

router.get("/goal", validateQuery(goalQuerySchema), getGoalImage)
router.get("/month", validateQuery(monthQuerySchema), getMonthImage)

export default router;

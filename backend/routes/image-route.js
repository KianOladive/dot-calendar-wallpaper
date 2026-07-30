import express from 'express';
import getGoalImage from '../controller/image-controller.js'
import { goalQuerySchema } from '@goalcal/core';

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

router.get("/", validateQuery(goalQuerySchema), getGoalImage)

export default router;

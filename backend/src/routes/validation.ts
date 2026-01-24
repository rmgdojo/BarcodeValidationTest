import { z } from 'zod';
import type { ValidationRequest, ValidationResponse } from '../types/barcode';
import { validationService } from '../services/ValidationService';

/**
 * Zod schema for validation request
 */
const ValidationRequestSchema = z.object({
  barcode: z.string().min(1),
});

/**
 * Handles POST /api/validate requests
 */
export async function handleValidation(
  request: Request,
): Promise<Response> {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedBody = ValidationRequestSchema.parse(body) as ValidationRequest;

    // Perform async validation
    const result = await validationService.validateBarcode(validatedBody.barcode);

    const response: ValidationResponse = {
      isValid: result.isValid,
      message: result.message,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          isValid: false,
          message: `Invalid request: ${error.message}`,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        isValid: false,
        message: 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

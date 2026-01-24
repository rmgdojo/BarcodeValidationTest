import { z } from 'zod';
import type { ValidationRequest, ValidationResponse } from '../types/barcode';

/**
 * Interface for API service
 * Follows Dependency Inversion Principle
 */
export interface IApiService {
  validateBarcode(barcode: string): Promise<ValidationResponse>;
}

/**
 * Zod schema for validation response
 */
const ValidationResponseSchema = z.object({
  isValid: z.boolean(),
  message: z.string(),
});

/**
 * API service for communicating with backend
 * Follows Single Responsibility Principle - only handles API communication
 */
export class ApiService implements IApiService {
  private readonly baseUrl: string;

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Validates a barcode via the backend API
   * @param barcode - The barcode string to validate
   * @returns Promise resolving to ValidationResponse
   * @throws Error if the API call fails
   */
  async validateBarcode(barcode: string): Promise<ValidationResponse> {
    const request: ValidationRequest = { barcode };

    try {
      const response = await fetch(`${this.baseUrl}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const validatedData = ValidationResponseSchema.parse(data);

      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid API response format: ${error.message}`);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred during API call');
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

import { SetMetadata } from '@nestjs/common';

export const API_METADATA_KEY = 'api_metadata';

export interface ApiMetadata {
  summary: string;
  description?: string;
  tags?: string[];
  responses?: {
    [statusCode: string]: {
      description: string;
      schema?: any;
    };
  };
}

export const ApiMetadata = (metadata: ApiMetadata) => SetMetadata(API_METADATA_KEY, metadata);

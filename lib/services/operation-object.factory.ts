import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { SchemaObjectFactory } from '@nestjs/swagger/dist/services/schema-object-factory';
import { SwaggerTypesMapper } from '@nestjs/swagger/dist/services/swagger-types-mapper';
import { getSchemaPath } from '@nestjs/swagger/dist/utils';
import {
  AsyncMessageObject,
  AsyncOperationObject,
} from '../interface';

export class OperationObjectFactory {
  private readonly modelPropertiesAccessor = new ModelPropertiesAccessor();
  private readonly swaggerTypesMapper = new SwaggerTypesMapper();
  private readonly schemaObjectFactory = new SchemaObjectFactory(
    this.modelPropertiesAccessor,
    this.swaggerTypesMapper,
  );

  create(
    operation: AsyncOperationObject,
    produces: string[],
    schemas: Record<string, SchemaObject>,
  ): AsyncOperationObject {
    const { messages } = operation;


    return {
      ...operation,
      messages: messages.map((message) =>
    };

    return {
      ...operation,
      message: {
        ...operation.message,
        payload: {
          $ref: getSchemaPath(
            this.getDtoName(message as AsyncMessageObject, schemas),
          ),
        },
      },
    };
  }

  private getDtoName(
    message: AsyncMessageObject,
    schemas: Record<string, SchemaObject>,
  ): string {
    const messagePayloadType = message.payload.type as Function;
    return this.schemaObjectFactory.exploreModelSchema(
      messagePayloadType,
      schemas,
    );
  }
}

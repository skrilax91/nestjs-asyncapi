import { ReferenceObject, ServerObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AmqpServerBinding, KafkaServerBinding } from '../binding';
import {
  AsyncServerVariableObject, AsyncTagObject, ExternalDocumentationObject,
  SecurityObject,
} from './asyncapi-common.interfaces';

export interface AsyncServerObject {
  host: string;
  protocol: string;
  protocolVersion: string;
  pathname: string;
  description?: string;
  title: string;
  summary: string;
  security?: ReferenceObject[];
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;

  bindings?: Record<string, KafkaServerBinding | AmqpServerBinding>;
}

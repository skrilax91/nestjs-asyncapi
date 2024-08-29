import {
  InfoObject,
  ReferenceObject,
  SchemaObject, SecuritySchemeObject,
  ServerVariableObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  AmqpChannelBinding,
  AmqpMessageBinding,
  AmqpOperationBinding,
  AmqpServerBinding,
  KafkaChannelBinding,
  KafkaMessageBinding,
  KafkaOperationBinding,
  KafkaServerBinding,
} from '../binding';
import { AsyncOperationPayload } from './asyncapi-operation-payload.interface';
import { AsyncServerObject } from './asyncapi-server.interface';

export interface AsyncApiDocument {
  asyncapi: string;
  id?: string;
  info: AsyncInfoObject;
  servers?: Record<string, AsyncServerObject>;
  channels?: AsyncChannelsObject;
  operations?: Record<string, AsyncOperationObject>;
  components?: AsyncComponentsObject;
  defaultContentType?: string;
}

export interface AsyncInfoObject extends InfoObject {
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
}

export type AsyncChannelsObject = Record<string, AsyncChannelObject>;
export interface AsyncChannelObject {
  address: string;
  messages?: Record<string, AsyncMessageObject>;
  title?: string;
  summary?: string;
  description?: string;
  servers?: ReferenceObject[];
  tags?: AsyncTagObject[];
  parameters?: Record<string, ParameterObject>;
  bindings?: Record<string, KafkaChannelBinding | AmqpChannelBinding>;
}

export interface AsyncServerVariableObject extends ServerVariableObject {
  examples?: string[];
}

export type SecurityObject = Record<string, string[]>;

export interface AsyncComponentsObject {
  schemas?: Record<string, SchemaObject>;
  messages?: Record<string, AsyncMessageObject>;
  securitySchemes?: Record<string, AsyncSecuritySchemeObject>;
  parameters?: Record<string, ParameterObject>;
  correlationIds?: Record<string, AsyncCorrelationObject>;
  operationTraits?: Record<string, AsyncOperationTraitObject>;
  messageTraits?: Record<string, AsyncMessageTraitObject>;
  serverBindings?: Record<string, KafkaServerBinding | AmqpServerBinding>;
  channelBindings?: Record<string, KafkaChannelBinding | AmqpChannelBinding>;
  operationBindings?: Record<
    string,
    KafkaOperationBinding | AmqpOperationBinding
  >;
  messageBindings?: Record<string, KafkaMessageBinding | AmqpMessageBinding>;
}

export interface AsyncMessageObject extends AsyncMessageTraitObject {
  payload?: {
    schemaFormat?: string;
    schema: {
      type?: AsyncOperationPayload;
      $ref?: AsyncOperationPayload;
    }
  };
}

export interface AsyncOperationObject {
  action: "send" | "receive";
  channel: ReferenceObject;
  title?: string;
  summary?: string;
  description?: string;
  security?: [SecuritySchemeObject | ReferenceObject];
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject | ReferenceObject;
  bindings?: KafkaOperationBinding | AmqpOperationBinding | ReferenceObject;
  traits?: [AsyncOperationTraitObject | ReferenceObject];
  messages?: ReferenceObject[];
  reply?: OperationReplyObject | ReferenceObject;
}

export interface AsyncOperationTraitObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  bindings?: Record<string, KafkaOperationBinding | AmqpOperationBinding>;
}

export interface OperationReplyObject {
  address: OperationReplyAddressObject | ReferenceObject;
  channel: ReferenceObject;
  messages: ReferenceObject[];
}

export interface OperationReplyAddressObject {
  description?: string;
  location: string;
}

export interface AsyncMessageTraitObject {
  headers?: SchemaObject;
  correlationId?: AsyncCorrelationObject;
  contentType?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  bindings?: Record<string, KafkaMessageBinding | AmqpMessageBinding>;
}

export interface AsyncCorrelationObject {
  description?: string;
  location: string;
}

export interface AsyncTagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface AsyncSecuritySchemeObject {
  type: SecuritySchemeType;
  description?: string;
  name?: string;
  in?: string;
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlowsObject;
  openIdConnectUrl?: string;
}

export declare type SecuritySchemeType =
  | 'userPassword'
  | 'apiKey'
  | 'X509'
  | 'symmetricEncryption'
  | 'asymmetricEncryption'
  | 'http'
  | 'oauth2'
  | 'openIdConnect';

export interface OAuthFlowsObject {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
}

export interface OAuthFlowObject {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: ScopesObject;
}

export type ScopesObject = Record<string, unknown>;

export type ParameterObject = BaseParameterObject;

export interface BaseParameterObject {
  description?: string;
  schema?: SchemaObject | ReferenceObject;
  location?: string;
  enum?: any[];
  examples?: any[] | Record<string, any>;
  default?: any;
}

export interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

import {
  AsyncChannelObject,
  AsyncChannelsObject,
  DenormalizedDoc,
} from '#lib';

export class AsyncapiTransformer {
  public normalizeChannels(
    denormalizedDocs: DenormalizedDoc[],
  ): Record<'channels', AsyncChannelsObject> {
    const flatChannels = denormalizedDocs.map((doc: DenormalizedDoc) => {
      const key = doc.root.name;
      const value: AsyncChannelObject = {
        address: doc.root.address,
        description: doc.root.description,
        bindings: doc.root.bindings,
        parameters: doc.root.parameters,
      };
      return { key, value };
    });

    const channels = flatChannels.reduce((acc, { key, value }) => {
      if (!acc[key]) {
        acc[key] = value;
      }

      acc[key].messages = acc[key].messages ?? value.messages;

      return acc;
    }, {});

    return { channels };
  }
}

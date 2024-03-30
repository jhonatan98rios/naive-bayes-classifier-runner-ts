
export abstract class AbstractStorageProvider {
  abstract getObject(key: string): Promise<Uint8Array | undefined>
}
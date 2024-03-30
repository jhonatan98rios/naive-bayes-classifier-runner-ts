import * as dotenv from 'dotenv'
import { S3Client, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { AbstractStorageProvider } from "../../domain/providers/AbstractStorageProvider";
import { handlePromise } from '../../utils/handlePromise';
import { NotFoundError, ParseError } from 'elysia';

dotenv.config()

export class S3Provider implements AbstractStorageProvider {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION! });
    this.bucketName = process.env.BUCKET_NAME!;
  }

  async getObject(key: string): Promise<Uint8Array | undefined> {

    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key })

    const [getObjectError, object] = await handlePromise<GetObjectCommandOutput>(
      this.s3Client.send(command)
    )
    if (getObjectError || !object.Body) throw new NotFoundError(`S3 object does not exist: ${getObjectError}`)

    const [ transformError, buffer ] = await handlePromise<Uint8Array>(object.Body.transformToByteArray())
    if (transformError) throw new ParseError(`S3 object is corrupted ${transformError}`)

    return buffer;
  }
}
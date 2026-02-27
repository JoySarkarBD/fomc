import config from "@shared/config/app.config";
import { Client } from "minio";
import * as path from "path";

const endpoint = config.MINIO_ENDPOINT || "127.0.0.1";
const port = parseInt(String(config.MINIO_PORT || "9000"), 10);
const useSSL = String(config.MINIO_USE_SSL || "false") === "true";
const accessKey = config.MINIO_ACCESS_KEY || "minioadmin";
const secretKey = config.MINIO_SECRET_KEY || "minioadmin";
const defaultBucket = config.MINIO_BUCKET || "avatars";

const client = new Client({
  endPoint: endpoint,
  port,
  useSSL,
  accessKey,
  secretKey,
});

async function ensureBucket(bucket = defaultBucket) {
  try {
    const exists = await client.bucketExists(bucket);
    if (!exists) {
      await client.makeBucket(bucket);
    }
  } catch (err) {
    // If bucketExists/makeBucket not supported or fails, allow putObject to fail normally
  }
}

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  contentType?: string,
): Promise<string> {
  const bucket = defaultBucket;
  await ensureBucket(bucket);
  const ext = path.extname(originalName) || "";
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  await client.putObject(bucket, unique, buffer, buffer.length, {
    "Content-Type": contentType || "application/octet-stream",
  } as any);
  return `minio://${bucket}/${unique}`;
}

export async function removeFile(filePath: string): Promise<void> {
  if (!filePath) return;
  const match = filePath.match(/^minio:\/\/([^\/]+)\/(.+)$/);
  if (!match) return;
  const bucket = match[1];
  const objectName = match[2];
  try {
    await client.removeObject(bucket, objectName);
  } catch (err) {
    // ignore removal errors
  }
}

export async function getSignedUrl(
  filePath: string,
  expiresInSeconds?: number,
): Promise<string | null> {
  if (!filePath) return null;

  const match = filePath.match(/^minio:\/\/([^\/]+)\/(.+)$/);
  if (!match) return null;

  const bucket = match[1];
  const objectName = match[2];

  try {
    // MinIO/Minio-js enforces a maximum expiry of 7 days (in seconds).
    const MAX_EXPIRES = 7 * 24 * 60 * 60; // 7 days in seconds
    const defaultExpires = Number(
      config.MINIO_OBJECT_EXPIRATION_SECONDS_FOR_AVATAR || 3600,
    );
    const expires = Math.min(
      typeof expiresInSeconds === "number" ? expiresInSeconds : defaultExpires,
      MAX_EXPIRES,
    );

    if (expiresInSeconds && expiresInSeconds > MAX_EXPIRES) {
      console.warn(
        `Requested expiresInSeconds=${expiresInSeconds} exceeds max; capping to ${MAX_EXPIRES}`,
      );
    }

    const url = await client.presignedGetObject(bucket, objectName, expires);
    return url;
  } catch (err) {
    console.error("Failed to generate signed URL", err);
    return null;
  }
}

export { client as minioClient };

import { createClient } from "@supabase/supabase-js";
import {
  DELIVERABLE_ALLOWED_MIME_TYPES,
  DELIVERABLE_BUCKET,
} from "@/constants/deliverables";
import { getSupabasePublicConfigStatus } from "@/lib/supabase/env";

type StorageClient = ReturnType<typeof createClient>;

let storageClient: StorageClient | null = null;

function normalizeEnvValue(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "") ?? "";
}

function getBucketName() {
  return normalizeEnvValue(process.env.SUPABASE_DELIVERABLES_BUCKET) || DELIVERABLE_BUCKET;
}

function getStorageClient() {
  const publicConfig = getSupabasePublicConfigStatus();

  if (!publicConfig.ok) {
    return {
      ok: false as const,
      message: publicConfig.message,
    };
  }

  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!serviceRoleKey) {
    return {
      ok: false as const,
      message:
        "SUPABASE_SERVICE_ROLE_KEY no esta configurada. El flujo queda preparado, pero la carga privada de archivos requiere esa variable en servidor.",
    };
  }

  if (!storageClient) {
    storageClient = createClient(publicConfig.config.url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return {
    ok: true as const,
    client: storageClient,
    bucket: getBucketName(),
  };
}

export class StorageService {
  static bucketName() {
    return getBucketName();
  }

  static isConfigured() {
    return getStorageClient().ok;
  }

  static async ensureDeliverablesBucket() {
    const storage = getStorageClient();

    if (!storage.ok) {
      return storage;
    }

    const existing = await storage.client.storage.getBucket(storage.bucket);

    if (!existing.error) {
      return storage;
    }

    const created = await storage.client.storage.createBucket(storage.bucket, {
      public: false,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: [...DELIVERABLE_ALLOWED_MIME_TYPES],
    });

    if (created.error) {
      return {
        ok: false as const,
        message: `No se pudo preparar el bucket privado ${storage.bucket}.`,
      };
    }

    return storage;
  }

  static async uploadPrivateFile(input: { path: string; file: File }) {
    const storage = await this.ensureDeliverablesBucket();

    if (!storage.ok) {
      return storage;
    }

    const bytes = Buffer.from(await input.file.arrayBuffer());
    const result = await storage.client.storage
      .from(storage.bucket)
      .upload(input.path, bytes, {
        contentType: input.file.type,
        upsert: true,
      });

    if (result.error) {
      return {
        ok: false as const,
        message: result.error.message,
      };
    }

    return {
      ok: true as const,
      path: result.data.path,
    };
  }

  static async createSignedUrl(filePath: string) {
    const storage = getStorageClient();

    if (!storage.ok) {
      return null;
    }

    const result = await storage.client.storage
      .from(storage.bucket)
      .createSignedUrl(filePath, 60 * 30);

    return result.data?.signedUrl ?? null;
  }

  static async removePrivateFile(filePath: string) {
    const storage = getStorageClient();

    if (!storage.ok) {
      return;
    }

    await storage.client.storage.from(storage.bucket).remove([filePath]);
  }
}


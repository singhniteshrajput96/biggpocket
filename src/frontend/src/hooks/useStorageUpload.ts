import { loadConfig } from "@caffeineai/core-infrastructure";
import { StorageClient } from "@caffeineai/object-storage";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useCallback, useRef } from "react";

/**
 * Returns an `uploadFile` function that uploads a browser File to object storage
 * and returns the direct presigned URL for the stored blob.
 */
export function useStorageUpload() {
  const clientRef = useRef<StorageClient | null>(null);

  const uploadFile = useCallback(
    async (file: File, onProgress?: (pct: number) => void): Promise<string> => {
      // Build the client lazily (config is cached after first load)
      if (!clientRef.current) {
        const config = await loadConfig();
        const agent = new HttpAgent({ host: config.backend_host });
        if (config.backend_host?.includes("localhost")) {
          await agent.fetchRootKey().catch(() => {
            // local replica — ignore fetch errors in dev
          });
        }
        clientRef.current = new StorageClient(
          config.bucket_name,
          config.storage_gateway_url,
          config.backend_canister_id,
          config.project_id,
          agent,
        );
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await clientRef.current.putFile(bytes, onProgress);
      const url = await clientRef.current.getDirectURL(hash);
      return url;
    },
    [],
  );

  return { uploadFile };
}

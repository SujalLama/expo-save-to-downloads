// Reexport the native module. On web, it will be resolved to ExpoSaveToDownloadsModule.web.ts

import ExpoSaveToDownloadsModule from "./ExpoSaveToDownloadsModule";

export function getTheme(): string {
  return ExpoSaveToDownloadsModule.getTheme();
}

export function saveFileToDownloads(fileUri: string): Promise<{
  success: boolean;
  message: string;
}> {
  return ExpoSaveToDownloadsModule.saveFileToDownloads(fileUri);
}

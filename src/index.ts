import ExpoSaveToDownloadsModule from "./ExpoSaveToDownloadsModule";

export function saveFileToDownloads(
  fileUri: string,
  folderName?: string
): Promise<{
  success: boolean;
  message: string;
}> {
  return ExpoSaveToDownloadsModule.saveFileToDownloads(fileUri, folderName);
}

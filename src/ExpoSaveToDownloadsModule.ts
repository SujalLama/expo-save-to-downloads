import { NativeModule, requireNativeModule } from "expo";

declare class ExpoSaveToDownloadsModule extends NativeModule {
  saveFileToDownloads(
    fileUri: string
  ): Promise<{ success: boolean; message: string }>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSaveToDownloadsModule>(
  "ExpoSaveToDownloads"
);

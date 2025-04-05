import { NativeModule } from "expo";
declare class ExpoSaveToDownloadsModule extends NativeModule {
    saveFileToDownloads(fileUri: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
declare const _default: ExpoSaveToDownloadsModule;
export default _default;
//# sourceMappingURL=ExpoSaveToDownloadsModule.d.ts.map
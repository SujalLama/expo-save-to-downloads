// Reexport the native module. On web, it will be resolved to ExpoSaveToDownloadsModule.web.ts
import ExpoSaveToDownloadsModule from "./ExpoSaveToDownloadsModule";
export function getTheme() {
    return ExpoSaveToDownloadsModule.getTheme();
}
export function saveFileToDownloads(fileUri) {
    return ExpoSaveToDownloadsModule.saveFileToDownloads(fileUri);
}
//# sourceMappingURL=index.js.map
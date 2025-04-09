// Reexport the native module. On web, it will be resolved to ExpoSaveToDownloadsModule.web.ts
// and on native platforms to ExpoSaveToDownloadsModule.ts
export { default } from './ExpoSaveToDownloadsModule';
export { default as ExpoSaveToDownloadsView } from './ExpoSaveToDownloadsView';
export * from  './ExpoSaveToDownloads.types';

import { NativeModule } from 'expo';
import { ExpoSaveToDownloadsModuleEvents } from './ExpoSaveToDownloads.types';
declare class ExpoSaveToDownloadsModule extends NativeModule<ExpoSaveToDownloadsModuleEvents> {
    PI: number;
    setValueAsync(value: string): Promise<void>;
    hello(): string;
}
declare const _default: typeof ExpoSaveToDownloadsModule;
export default _default;
//# sourceMappingURL=ExpoSaveToDownloadsModule.web.d.ts.map
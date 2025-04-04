import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSaveToDownloadsModuleEvents } from './ExpoSaveToDownloads.types';

declare class ExpoSaveToDownloadsModule extends NativeModule<ExpoSaveToDownloadsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSaveToDownloadsModule>('ExpoSaveToDownloads');

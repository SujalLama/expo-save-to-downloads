import { registerWebModule, NativeModule } from 'expo';

import { ExpoSaveToDownloadsModuleEvents } from './ExpoSaveToDownloads.types';

class ExpoSaveToDownloadsModule extends NativeModule<ExpoSaveToDownloadsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoSaveToDownloadsModule);

import { registerWebModule, NativeModule } from 'expo';
class ExpoSaveToDownloadsModule extends NativeModule {
    PI = Math.PI;
    async setValueAsync(value) {
        this.emit('onChange', { value });
    }
    hello() {
        return 'Hello world! 👋';
    }
}
export default registerWebModule(ExpoSaveToDownloadsModule);
//# sourceMappingURL=ExpoSaveToDownloadsModule.web.js.map
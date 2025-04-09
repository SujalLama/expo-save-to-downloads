import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoSaveToDownloadsViewProps } from './ExpoSaveToDownloads.types';

const NativeView: React.ComponentType<ExpoSaveToDownloadsViewProps> =
  requireNativeView('ExpoSaveToDownloads');

export default function ExpoSaveToDownloadsView(props: ExpoSaveToDownloadsViewProps) {
  return <NativeView {...props} />;
}

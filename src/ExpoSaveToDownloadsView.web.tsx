import * as React from 'react';

import { ExpoSaveToDownloadsViewProps } from './ExpoSaveToDownloads.types';

export default function ExpoSaveToDownloadsView(props: ExpoSaveToDownloadsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}

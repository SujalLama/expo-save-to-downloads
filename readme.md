# 📥 Expo Save To Downloads

A simple custom Expo module for saving files to the **Documents** directory on **iOS** and the **Downloads** directory on **Android** — with support for optional subfolders.

---

## ✨ Features

- 📁 Save files to the Downloads folder  
- 🗂️ Optional folder creation and management  
- ⚙️ Compatible with **Expo Modules API**  
- 📱 Works on both **Android** and **iOS**

---

## 📦 Installation

> ⚠️ This is a custom native module. You must use a **development build** (or eject to bare workflow) to use it with Expo.

### 1. Install the module

```bash
npx expo install expo-save-to-downloads
```

### 2. Install `expo-media-library`

We need permission to store files:

```bash
npx expo install expo-media-library
```

### 3. Configure `package.json`

Add the following under the `expo` key:

```json
"expo": {
  "plugins": [
    [
      "expo-media-library",
      {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
        "isAccessMediaLocationEnabled": true
      }
    ]
  ]
}
```

### 4. Configure `app.json` for iOS

```json
"ios": {
  "infoPlist": {
    "UIFileSharingEnabled": true,
    "LSSupportsOpeningDocumentsInPlace": true,
    "NSPhotoLibraryUsageDescription": "We need access to save files and media to the downloads folder in your device."
  }
}
```

### 5. Rebuild the development build

```bash
npx expo run:android
# or
npx expo run:ios
```

---

## 🛠️ Usage

```ts
import * as ExpoSaveToDownloads from "expo-save-to-downloads";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

async function saveToDownloads() {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  // Ensure media library access
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Storage access is required to save files."
    );
    return;
  }

  /**
   * Save a file to the root of Downloads (Android) or Documents (iOS).
   * You can optionally specify a folder name to save the file inside a subfolder.
   */

  const result = await ExpoSaveToDownloads.saveFileToDownloads(
    "file:///path/to/file.pdf",
    "MyFolder" // Optional folder name
  );

  console.log(result);
  // -> { success: true, message: "Success: File saved to ..." }
}
```

---

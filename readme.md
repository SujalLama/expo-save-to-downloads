# 📥 Expo Save To Downloads

A simple custom Expo module for saving files to the Documents directory on **iOS** and Downloads directory on **Android** — with support for optional subfolders.

## ✨ Features

- Save files to the Downloads folder
- Optional folder creation and management
- Compatible with **Expo Modules API**
- Works on both **Android** and **iOS**

---

## 📦 Installation

> ⚠️ This is a custom native module. You must use a development build (or eject to bare workflow) to use it with Expo.

1. Clone or download this module into your project.
2. Ensure your app is using the Expo Modules API and a custom development client.
3. Add the module to your native iOS and Android projects.

---

## 🛠️ Usage

```ts
import * as ExpoSaveToDownloads from "expo-save-to-downloads";

// Save a file directly to the root of Downloads

const result = await ExpoSaveToDownloads.saveFileToDownloads(
  "file:///path/to/file.pdf",
  folder_name
);

// Save to a custom subfolder inside Downloads
const result = await saveFileToDownloads(
  "file:///path/to/file.pdf",
  "MyFolder"
);

console.log(result);
// -> { success: true, message: "Success: File saved to ..." }
```

### In these in the infoPlist in app.json

```ts
      "infoPlist": {
        "UIFileSharingEnabled": true,
        "LSSupportsOpeningDocumentsInPlace": true,
        "NSPhotoLibraryUsageDescription": "We need access to save files and media to to downloads folder in your device."
      }
```

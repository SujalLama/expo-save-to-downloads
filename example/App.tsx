import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ExpoSaveToDownloads from "expo-save-to-downloads";
import { Alert, Pressable, Text, View } from "react-native";

async function requestStoragePermission() {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Storage access is required to save files."
    );
    return false;
  }

  return true;
}

async function handleDownload() {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) return;

  // const pdfUrl =
  //   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const pdfUrl =
    "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf";
  const fileUri = FileSystem.documentDirectory + "sample2.pdf";
  try {
    const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);
    const res = await ExpoSaveToDownloads.saveFileToDownloads(uri);

    Alert.alert(
      res.success ? "File saved successfully!" : "Failed to save." + res.message
    );
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}

async function handleDownloadWithFolder() {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) return;

  // const pdfUrl =
  //   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const pdfUrl =
    "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf";
  const fileUri = FileSystem.documentDirectory + "sample3.pdf";
  try {
    const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);
    const res = await ExpoSaveToDownloads.saveFileToDownloads(uri, "example");

    Alert.alert(
      res.success ? "File saved successfully!" : "Failed to save." + res.message
    );
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={handleDownload}>
        <Text>Download File</Text>
      </Pressable>

      <View style={{ marginVertical: 20 }} />

      <Pressable onPress={handleDownloadWithFolder}>
        <Text>Download File In folder</Text>
      </Pressable>
    </View>
  );
}

import ExpoModulesCore

public class ExpoSaveToDownloadsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSaveToDownloads")

    Function("saveFileToDownloads") { (fileUri: String, folderName: String?) -> [String: Any] in
      return self.saveFile(fileUri: fileUri, folderName: folderName)
    }
  }

  private func saveFile(fileUri: String, folderName: String?) -> [String: Any] {
    // Convert the file URI to URL and fetch the data from it
    guard let url = URL(string: fileUri), let data = try? Data(contentsOf: url) else {
      return ["success": false, "message": "Error: Failed to fetch data from the provided URL."]
    }

    let fileManager = FileManager.default

    // Get the app's Documents directory
    guard let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
      return ["success": false, "message": "Error: Failed to get Documents directory."]
    }

    // Determine target directory (root or subfolder)
    let targetDirectory: URL
    if let folderName = folderName, !folderName.isEmpty {
      targetDirectory = documentsDirectory.appendingPathComponent(folderName)

      // Check if folder exists, create if not
      if !fileManager.fileExists(atPath: targetDirectory.path) {
        do {
          try fileManager.createDirectory(at: targetDirectory, withIntermediateDirectories: true, attributes: nil)
        } catch {
          return ["success": false, "message": "Error: Failed to create folder '\(folderName)'. \(error.localizedDescription)"]
        }
      }
    } else {
      // No folder name provided, use root of Documents
      targetDirectory = documentsDirectory
    }

    // Prepare the destination URL
    let fileName = url.lastPathComponent
    let destinationURL = targetDirectory.appendingPathComponent(fileName)

    // Save the file
    do {
      try data.write(to: destinationURL)
      return ["success": true, "message": "Success: File saved to \(destinationURL.path)"]
    } catch {
      return ["success": false, "message": "Error: Failed to save the file. \(error.localizedDescription)"]
    }
  }
}

import ExpoModulesCore

public class ExpoSaveToDownloadsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSaveToDownloads")

    Function("saveFileToDownloads") { (fileUri: String, folderName: String?) -> [String: Any] in
      return self.saveFile(fileUri: fileUri, folderName: folderName)
    }
  }

  private func saveFile(fileUri: String, folderName: String?) -> [String: Any] {
    // Clean and convert file URI
    let cleanedPath = fileUri.replacingOccurrences(of: "file://", with: "")
    let sourceURL = URL(fileURLWithPath: cleanedPath)

    // Load data
    guard let data = try? Data(contentsOf: sourceURL) else {
      return ["success": false, "message": "Error: Failed to read file data from \(sourceURL.path)"]
    }

    let fileManager = FileManager.default

    // Get base Documents directory
    guard var targetDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
      return ["success": false, "message": "Error: Failed to access Documents directory."]
    }

    var shouldDeleteSourceFile = false

    // Append folder if provided
    if let folderName = folderName, !folderName.isEmpty {
      targetDirectory.appendPathComponent(folderName)
      shouldDeleteSourceFile = true

      // Create folder if needed
      if !fileManager.fileExists(atPath: targetDirectory.path) {
        do {
          try fileManager.createDirectory(at: targetDirectory, withIntermediateDirectories: true, attributes: nil)
        } catch {
          return ["success": false, "message": "Error: Failed to create folder \(folderName). \(error.localizedDescription)"]
        }
      }
    }

    let destinationURL = targetDirectory.appendingPathComponent(sourceURL.lastPathComponent)

    // Save file and conditionally delete original
    do {
      try data.write(to: destinationURL)

      if shouldDeleteSourceFile {
        try? fileManager.removeItem(at: sourceURL)
      }

      return [
        "success": true,
        "message": "Success: File saved to \(destinationURL.path)\(shouldDeleteSourceFile ? " and source deleted." : "")"
      ]
    } catch {
      return ["success": false, "message": "Error: \(error.localizedDescription)"]
    }
  }
}

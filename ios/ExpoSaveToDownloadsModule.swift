

import ExpoModulesCore
import Foundation
import UIKit
import Photos

public class ExpoSaveToDownloadsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSaveToDownloads")

    Function("saveFileToDownloads") { (fileUri: String) -> [String: Any] in
      return self.saveFile(fileUri: fileUri)
    }
  }

  private func saveFile(fileUri: String) -> [String: Any] {
    // Check for photo library permissions
    let photoAuthorizationStatus = PHPhotoLibrary.authorizationStatus()
    if photoAuthorizationStatus != .authorized && photoAuthorizationStatus != .limited {
      return ["success": false, "message": "Error: Photo library permission denied."]
    }

    // Convert the file URI to URL and fetch the data from it
    guard let url = URL(string: fileUri), let data = try? Data(contentsOf: url) else {
      return ["success": false, "message": "Error: Failed to fetch data from the provided URL."]
    }

    let fileManager = FileManager.default

    // Get the app's Documents directory
    guard let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
      return ["success": false, "message": "Error: Failed to get Documents directory."]
    }

    // Extract the filename from the URI
    let fileName = url.lastPathComponent

    // Define the destination URL for the file in the Documents folder
    let destinationURL = documentsDirectory.appendingPathComponent(fileName)

    // Try saving the file data to the destination
    do {
      try data.write(to: destinationURL)
      return ["success": true, "message": "Success: File saved successfully to Documents folder."]
    } catch {
      return ["success": false, "message": "Error: Failed to save the file. \(error.localizedDescription)"]
    }
  }
}

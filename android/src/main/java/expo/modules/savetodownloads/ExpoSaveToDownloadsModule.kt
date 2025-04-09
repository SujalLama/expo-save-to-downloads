package expo.modules.savetodownloads

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoSaveToDownloadsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSaveToDownloads")

    Function("saveFileToDownloads") { fileUri: String, folderName: String? ->
      val context = appContext.reactContext ?: throw IllegalStateException("React context is null")
      return@Function saveFile(context, fileUri, folderName)
    }
  }

  private fun saveFile(context: Context, fileUri: String, folderName: String?): Map<String, Any> {
    return try {
      // Get the file name from the file URI
      val file = File(fileUri.replace("file://", ""))
      val fileName = file.name

      val inputStream: InputStream = file.inputStream()

      // Prepare ContentValues for the new file
      val values = ContentValues().apply {
        put(MediaStore.MediaColumns.DISPLAY_NAME, fileName)
        put(MediaStore.MediaColumns.MIME_TYPE, "application/octet-stream")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
          // Save to Downloads/folderName if folder is provided
          val relativePath = if (!folderName.isNullOrBlank()) {
            "${Environment.DIRECTORY_DOWNLOADS}/$folderName"
          } else {
            Environment.DIRECTORY_DOWNLOADS
          }
          put(MediaStore.MediaColumns.RELATIVE_PATH, relativePath)
        }
      }

      val contentUri: Uri = MediaStore.Downloads.EXTERNAL_CONTENT_URI
      val uri = context.contentResolver.insert(contentUri, values)

      if (uri != null) {
        context.contentResolver.openOutputStream(uri)?.use { outputStream ->
          inputStream.copyTo(outputStream)
        }
        inputStream.close()
        mapOf("success" to true, "message" to "Success: File saved successfully to Downloads${if (!folderName.isNullOrBlank()) "/$folderName" else ""} folder.")
      } else {
        mapOf("success" to false, "message" to "Error: Failed to insert file into MediaStore.")
      }
    } catch (e: Exception) {
      mapOf("success" to false, "message" to "Error: ${e.localizedMessage}")
    }
  }

}

package expo.modules.savetodownloads

import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File
import java.io.InputStream
import java.io.OutputStream

class ExpoSaveToDownloadsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSaveToDownloads")

    Function("saveFileToDownloads") { fileUri: String ->
      val context = appContext.reactContext ?: throw IllegalStateException("React context is null")
      return@Function saveFile(context, fileUri)
    }
  }

  private fun saveFile(context: Context, fileUri: String): Map<String, Any> {
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
          put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
        }
      }

      val contentUri: Uri = MediaStore.Downloads.EXTERNAL_CONTENT_URI
      val uri = context.contentResolver.insert(contentUri, values)

      if (uri != null) {
        context.contentResolver.openOutputStream(uri)?.use { outputStream ->
          inputStream.copyTo(outputStream)
        }
        inputStream.close()
        mapOf("success" to true, "message" to "Success: File saved successfully to Downloads folder.")
      } else {
        mapOf("success" to false, "message" to "Error: Failed to insert file into MediaStore.")
      }
    } catch (e: Exception) {
      mapOf("success" to false, "message" to "Error: ${e.localizedMessage}")
    }
  }
}

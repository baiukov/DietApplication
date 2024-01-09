import android.app.DownloadManager
import android.content.Context
import android.net.Uri
import android.os.Environment
import android.webkit.DownloadListener
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class CustomWebViewClient(private val context: Context) : WebViewClient(), DownloadListener {

    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
        // Handle the URL loading here
        // You can implement your logic to download the page or perform any other action

        // For example, initiate a download using DownloadManager
        val url = request.url.toString()
        downloadUrl(url)

        // Return true to indicate that the WebView should not handle the URL loading
        return true
    }

    override fun onDownloadStart(url: String?, userAgent: String?, contentDisposition: String?, mimeType: String?, contentLength: Long) {
        // Implement download logic here if needed
        downloadUrl(url.orEmpty())
    }

    private fun downloadUrl(url: String) {
        // Use DownloadManager to initiate a download
        val request = DownloadManager.Request(Uri.parse(url))
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "downloaded_page.html")

        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as? DownloadManager
        downloadManager?.enqueue(request)
    }
}
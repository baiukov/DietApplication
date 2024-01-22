package com.example.dietapplication_app
import android.webkit.WebView
import android.webkit.WebViewClient

class CustomWebView : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        // This method is called when a new URL is about to be loaded.
        // Returning true means the WebView should handle the URL, and it won't be opened in an external browser.

        if (url != null) {
            view?.loadUrl(url)
        } // Load the URL in the WebView

        return true
    }
}
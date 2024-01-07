package com.example.dietapplication_app

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.example.dietapplication_app.ui.theme.DietApplication_appTheme
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.internal.tls.OkHostnameVerifier
import java.security.cert.CertificateException
import java.security.cert.X509Certificate
import java.util.concurrent.TimeUnit
import javax.net.ssl.HostnameVerifier
import javax.net.ssl.HttpsURLConnection
import javax.net.ssl.SSLContext
import javax.net.ssl.X509TrustManager
import kotlin.reflect.KParameter

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private lateinit var client: OkHttpClient

    @OptIn(DelicateCoroutinesApi::class)
    @SuppressLint("CoroutineCreationDuringComposition", "SetJavaScriptEnabled", "JavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set up a custom TrustManager for SSL certificate validation
        val trustManagers = arrayOf(CustomTrustManager())

        // Set up an SSLContext with the custom TrustManager
        val sslContext = SSLContext.getInstance("TLS")
        sslContext.init(null, trustManagers, null)

        // Set the custom SSLContext on the OkHttpClient
        client = OkHttpClient.Builder()
            .sslSocketFactory(sslContext.socketFactory, trustManagers[0] as X509TrustManager)
            .hostnameVerifier { _, _ -> true } // Bypass hostname verification
            .build()

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        webView.addJavascriptInterface(this, "AndroidInterface")
        webView.loadUrl("http://10.0.2.2:5500/index.html")
        setContentView(webView)

        GlobalScope.launch(Dispatchers.IO) {
            try {
                // Now you can make your network requests without SSL validation
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    @JavascriptInterface
    fun sendDataToWebView(eventName: String, data: String) {
        // Call this method from your Kotlin code to send data to the WebView
        println(data)
        webView.post {
            webView.evaluateJavascript("getData('${eventName}', '${data}')", null)
        }
    }

    @SuppressLint("JavascriptInterface")
    @JavascriptInterface
    fun emitServer(module: String, endpoint: String, data: String): String {
        val url = "https://10.0.2.2:8080/api/$module/$endpoint"


        val requestBody = data.toRequestBody("application/json".toMediaTypeOrNull())
        println(data)
        val request = Request.Builder()
            .url(url)
            .post(requestBody)
            .build()

        val response = client.newCall(request).execute()

        val responseBody = response.body?.string()

        if (responseBody != null) {
            val eventName = "$module:$endpoint"
            sendDataToWebView(eventName, responseBody)
        }

        response.close()
        return responseBody ?: "No data"
    }
}

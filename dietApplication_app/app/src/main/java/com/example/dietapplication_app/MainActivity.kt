package com.example.dietapplication_app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.dietapplication_app.ui.theme.DietApplication_appTheme
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.internal.tls.OkHostnameVerifier
import java.security.cert.CertificateException
import java.security.cert.X509Certificate
import javax.net.ssl.HostnameVerifier
import javax.net.ssl.HttpsURLConnection
import javax.net.ssl.SSLContext
import javax.net.ssl.X509TrustManager
import kotlin.reflect.KParameter

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView

    @SuppressLint("CoroutineCreationDuringComposition", "SetJavaScriptEnabled", "JavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set up a custom TrustManager for SSL certificate validation
        val trustManagers = arrayOf(CustomTrustManager())

        // Set up an SSLContext with the custom TrustManager
        val sslContext = SSLContext.getInstance("TLS")
        sslContext.init(null, trustManagers, null)

        // Set the custom SSLContext on the OkHttpClient
        val client = OkHttpClient.Builder()
            .sslSocketFactory(sslContext.socketFactory, trustManagers[0] as X509TrustManager)
            .hostnameVerifier { _, _ -> true } // Bypass hostname verification
            .build()

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.addJavascriptInterface(this, "AndroidInterface")

        // Define your HTML content
        val htmlContent = """
            <!DOCTYPE html>
            <html>
                <head>
                    <title>My HTML Page</title>
                </head>
                <body>
                        <p id='main'>123</p>
                        <script>
                        function displayDataFromAndroid(data) {
                            console.log("Data received from Android: " + data);
                            document.getElementById('main').innerText = data;
                        }
                        </script>
                
                </body>
            </html>
        """.trimIndent()

        webView.loadData(htmlContent, "text/html", "UTF-8")
        setContentView(webView)

        GlobalScope.launch(Dispatchers.IO) {
            try {
                // Now you can make your network requests without SSL validation
                val data = makeNetworkRequest(client)
                sendDataToWebView(data)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    @SuppressLint("JavascriptInterface")
    @JavascriptInterface
    fun sendDataToWebView(data: String) {
        // Call this method from your Kotlin code to send data to the WebView
        println(data)
        webView.post {
            webView.evaluateJavascript("displayDataFromAndroid('$data')", null)
        }
    }

    private fun updateUI(data: String) {
        setContent {
            DietApplication_appTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    // Display the data in a Text composable
                    Text(text = data, modifier = Modifier.fillMaxSize())
                }
            }
        }
    }

    private suspend fun makeNetworkRequest(client: OkHttpClient): String {
        // Define the URL for your request
        val url = "https://10.0.2.2:8080/hello"

        // Build a request
        val request = Request.Builder()
            .url(url)
            .build()

        // Execute the request
        val response = client.newCall(request).execute()

        // Get the response body as a string
        val responseBody = response.body?.string()

        // Process the response as needed
        println(responseBody)

        // Don't forget to close the response to release resources
        response.close()
        return responseBody ?: "No data"
    }
}

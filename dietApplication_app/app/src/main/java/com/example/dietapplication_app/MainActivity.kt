package com.example.dietapplication_app

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import javax.net.ssl.SSLContext
import javax.net.ssl.X509TrustManager

/*
*	Třída MainActivity - je hlávní třída Kotlin Android aplikace,
*	je spustitelná a nastavují zobrazuje hlávní prvky apliakce.
*
*   @author Aleksei Baiukov
*/
class MainActivity : ComponentActivity() {
    // proměnná webového rozhrání
    private lateinit var webView: WebView

    // proměnná klienta pro http komunikaci s webserverem
    private lateinit var client: OkHttpClient

    // metoda vyvolaná po spuštění aplikace, nastaví hlávní stránku
    @OptIn(DelicateCoroutinesApi::class)
    @SuppressLint("CoroutineCreationDuringComposition", "SetJavaScriptEnabled", "JavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // nastaví upravený správce důvěry pro komunikace na lokální servery
        val trustManagers = arrayOf(CustomTrustManager())

        // nastaví Ssl context pomocí vlastního Trustmanageru
        val sslContext = SSLContext.getInstance("TLS")
        sslContext.init(null, trustManagers, null)

        // vytvoří klienta pro komunikaci s webserverem přes http
        client = OkHttpClient.Builder()
            .sslSocketFactory(sslContext.socketFactory, trustManagers[0] as X509TrustManager)
            .hostnameVerifier { _, _ -> true } // Obejde ověření názvu hostitele
            .build()

        // vytvoří lokální prohlížeč
        webView = WebView(this)
        webView.webViewClient = CustomWebView()

        // nastavní použítí javascriptu v lokálním prohlížeči
        webView.settings.javaScriptEnabled = true

        // nakonfiguruje nastavení WebView tak, aby umožňovalo načítání
        // smíšeného obsahu (zabezpečených i nezabezpečených zdrojů).
        webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        // přídá k javascriptu objekt AndroidInterface, který je mostem pro komunikaci s Androidem
        webView.addJavascriptInterface(this, "AndroidInterface")

        // pošle požadavek na front-endový server a vygeneruje podle odpovědí stránku
        webView.loadUrl("http://10.0.2.2:5500")

        // nastavení html stránky na hlávní obrázovku android aplikace
        setContentView(webView)
    }

    // metoda pro posílání dat na frontend
    @JavascriptInterface
    fun sendDataToWebView(eventName: String, data: String) {
        // vyvolá metodu v javascriptu frontendové částí
        println(data)
        webView.post {
            // vyvolá metodu getData s parametry názvu událostí a daty
            webView.evaluateJavascript("getData('${eventName}', '${data}')", null)
        }
    }

    // metoda zajíšťující komunikaci s webovém serverem
    @SuppressLint("JavascriptInterface")
    @JavascriptInterface
    fun emitServer(endpoint: String, data: String) {
        lifecycleScope.launch {
            try {
                val url = "https://10.0.2.2:8181/api/$endpoint"
                val requestBody = data.toRequestBody("application/json".toMediaTypeOrNull())
                val request = Request.Builder()
                    .url(url)
                    .post(requestBody)
                    .build()

                withContext(Dispatchers.IO) {
                    client.newCall(request).execute().use { response ->
                        val responseBody = response.body?.string()
                        println(responseBody)
                        responseBody?.let {
                            sendDataToWebView(endpoint, it)
                        } ?: run {
                            // Handle error scenario
                        }
                    }
                }
            } catch (e: Exception) {
                // Handle the exception
            }
        }
    }

}

package com.example.dietapplication_app

import CustomWebViewClient
import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.*
import androidx.activity.ComponentActivity
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.IOException
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

        // nastavní použítí javascriptu v lokálním prohlížeči
        webView.settings.javaScriptEnabled = true

        // nakonfiguruje nastavení WebView tak, aby umožňovalo načítání
        // smíšeného obsahu (zabezpečených i nezabezpečených zdrojů).
        webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        // přídá k javascriptu objekt AndroidInterface, který je mostem pro komunikaci s Androidem
        webView.addJavascriptInterface(this, "AndroidInterface")

        // spuštění asynchronního načítání HTML stránky z frontendového serveru
        GlobalScope.launch(Dispatchers.IO) {
            // odkaz na server
            val url = "http://5.187.1.55/index.html"
            // získaná dynamická HTML stránka
            val html = sendHttpRequest(url)

            launch(Dispatchers.Main) {
                // nastavení html stránky na obrázovku mobilu
                webView.loadDataWithBaseURL(url, html, "text/html", "utf-8", null)
                setContentView(webView)
            }
        }
    }

    // metoda pro posílání http požadavků
    private fun sendHttpRequest(url: String): String {
        // stavitel požadavku podle adresy
        val request = Request.Builder()
            .url(url)
            .build()
        try {
            // pošle požadavek
            client.newCall(request).execute().use { response: Response ->
                // pokud dopadl úspěšně, vrátí odpověď na něj
                if (response.isSuccessful) {
                    return response.body?.string() ?: ""
                }
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return ""
    }

    // metoda pro posílání dat na frontend
    @JavascriptInterface
    fun sendDataToWebView(eventName: String, data: String) {
        // vyvolá metodu v javascriptu frontendové částí
        webView.post {
            // vyvolá metodu getData s parametry názvu událostí a daty
            webView.evaluateJavascript("getData('${eventName}', '${data}')", null)
        }
    }

    // metoda zajíšťující komunikaci s webovém serverem
    @SuppressLint("JavascriptInterface")
    @JavascriptInterface
    fun emitServer(endpoint: String, data: String): String {
        // URL adresa webového backend serveru. Endpoint - je koncový bod nastavený na serveru podle názvu události
        val url = "https://5.187.1.55/api/$endpoint"

        // zabalí data do příslušné třídy pro požadvek
        val requestBody = data.toRequestBody("application/json".toMediaTypeOrNull())

        // vytvoří požadvek podle URL webserveru a dat
        val request = Request.Builder()
            .url(url)
            .post(requestBody)
            .build()

        // pokusí se poslat požadavek na webserver
        val response = client.newCall(request).execute()


        // získá odpověď na požadavek
        val responseBody = response.body?.string()
        println(responseBody)


        // pokud je odpověď existující, přepošle získaná data na frontend podle názvu eventu
        if (responseBody != null) {
            sendDataToWebView(endpoint, responseBody)
        }

        // každopadně uzavře komunikační požadavek
        response.close()
        return responseBody ?: "No data"
    }
}

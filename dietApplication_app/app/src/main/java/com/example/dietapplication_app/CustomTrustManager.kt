package com.example.dietapplication_app

import java.security.cert.CertificateException
import java.security.cert.X509Certificate
import javax.net.ssl.X509TrustManager

class CustomTrustManager : X509TrustManager {
    override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {
        // Allow all clients
    }

    override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {
        // Allow all servers
    }

    override fun getAcceptedIssuers(): Array<X509Certificate> {
        return emptyArray()
    }
}
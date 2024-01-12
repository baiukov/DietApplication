package com.example.dietapplication_app

import java.security.cert.X509Certificate
import javax.net.ssl.X509TrustManager

/*
*	Třída CustomTrustManager - je třída, která přepisuje standardního správce důvěry v Kotlinu
*   Je nutná k povolení nebezpečných serverů, včetně lokálního
*
*   @author Aleksei Baiukov
*/
class CustomTrustManager : X509TrustManager {
    // povolí všechny klienty
    override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) { }

    // povolí všechny servery
    override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) { }

    override fun getAcceptedIssuers(): Array<X509Certificate> { return emptyArray() }
}
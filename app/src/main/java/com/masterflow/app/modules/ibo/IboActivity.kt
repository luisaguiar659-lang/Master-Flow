package com.masterflow.app.modules.ibo

import android.app.Activity
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView

class IboActivity : Activity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)

        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true

        webView.webViewClient = IboWebViewClient()
        webView.addJavascriptInterface(
            IboJavascriptBridge(),
            "XCORE"
        )

        webView.loadUrl(IboConfig.PANEL_URL)

        setContentView(webView)
    }
}

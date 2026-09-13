package com.masterflow.app.modules.ibo

import android.app.Activity
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView

class IboActivity : Activity() {

    private lateinit var webView: WebView
    private val session = IboSessionManager()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)

        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true

        webView.webViewClient = IboWebViewClient()

        webView.addJavascriptInterface(
            IboJavascriptBridge(session),
            "XCORE"
        )

        if (session.isAuthenticated()) {
            webView.loadUrl(IboConfig.PANEL_URL)
        } else {
            webView.loadUrl(IboConfig.LOGIN_URL)
        }

        setContentView(webView)
    }
}

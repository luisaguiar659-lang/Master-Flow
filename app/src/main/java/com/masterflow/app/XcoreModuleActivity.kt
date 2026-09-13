package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.widget.TextView

class XcoreModuleActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val module = intent.getStringExtra("module") ?: "XCORE"

        val text = TextView(this)
        text.text = "XCORE\n\n$module\n\nMódulo iniciado ✅"
        text.textSize = 24f
        text.setTextColor(Color.WHITE)
        text.setBackgroundColor(Color.BLACK)
        text.gravity = android.view.Gravity.CENTER

        setContentView(text)
    }
}

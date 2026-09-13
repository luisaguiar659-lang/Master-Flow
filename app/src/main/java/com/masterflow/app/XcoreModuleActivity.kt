package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView

class XcoreModuleActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val name = intent.getStringExtra("name") ?: "XCORE"
        val description = intent.getStringExtra("description") ?: ""
        val version = intent.getStringExtra("version") ?: "1.0"
        val status = intent.getStringExtra("status") ?: "OFFLINE"

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = Gravity.CENTER
        layout.setPadding(40,40,40,40)
        layout.setBackgroundColor(Color.BLACK)

        val title = TextView(this)
        title.text = "XCORE\n\n$name"
        title.textSize = 28f
        title.setTextColor(Color.WHITE)
        title.gravity = Gravity.CENTER
        layout.addView(title)

        val info = TextView(this)
        info.text = """
            Sistema iniciado ✅

            Módulo: $name

            Descrição: $description

            Versão: $version

            Status: $status
        """.trimIndent()

        info.textSize = 18f
        info.setTextColor(Color.GRAY)
        info.gravity = Gravity.CENTER
        layout.addView(info)

        setContentView(layout)
    }
}

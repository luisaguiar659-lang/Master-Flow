package com.masterflow.app.modules.cloud

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView

class XcloudActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = Gravity.CENTER
        layout.setPadding(40,40,40,40)
        layout.setBackgroundColor(Color.BLACK)

        val title = TextView(this)
        title.text = "XCORE CLOUD"
        title.textSize = 28f
        title.setTextColor(Color.WHITE)
        title.gravity = Gravity.CENTER

        layout.addView(title)

        val info = TextView(this)
        info.text = """
            Cloud Engine iniciado ✅

            Dispositivos
            MAC Manager
            DNS Manager
            Automação
            Revendedores
        """.trimIndent()

        info.textSize = 18f
        info.setTextColor(Color.GRAY)
        info.gravity = Gravity.CENTER

        layout.addView(info)

        setContentView(layout)
    }
}

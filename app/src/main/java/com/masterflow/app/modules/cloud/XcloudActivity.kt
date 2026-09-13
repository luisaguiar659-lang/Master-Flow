package com.masterflow.app.modules.cloud

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.content.Intent
import android.view.Gravity
import android.widget.Button
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
        title.text = "XCORE CLOUD ENGINE"
        title.textSize = 28f
        title.setTextColor(Color.WHITE)
        title.gravity = Gravity.CENTER
        layout.addView(title)

        addButton(layout, "DEVICES") {
            startActivity(Intent(this, XcloudDevicesActivity::class.java))
        }

        addButton(layout, "MAC MANAGER") {
        }

        addButton(layout, "DNS MANAGER") {
        }

        addButton(layout, "AUTOMAÇÃO") {
        }

        addButton(layout, "REVENDEDORES") {
        }

        val status = TextView(this)
        status.text = "\nCloud Engine ONLINE ✅"
        status.textSize = 18f
        status.setTextColor(Color.GRAY)
        status.gravity = Gravity.CENTER
        layout.addView(status)

        setContentView(layout)
    }

    private fun addButton(layout: LinearLayout, text: String, action: () -> Unit) {
        val button = Button(this)
        button.text = text
        button.setTextColor(Color.WHITE)
        button.setBackgroundColor(Color.rgb(180,0,0))
        button.setOnClickListener { action() }
        layout.addView(button, LinearLayout.LayoutParams(-1,120))
    }
}

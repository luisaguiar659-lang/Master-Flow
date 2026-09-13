package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.widget.TextView
import com.masterflow.app.modules.ModuleManager

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val moduleManager = ModuleManager()
        val modules = moduleManager.getModules()

        val text = TextView(this)
        text.text = "MASTER FLOW\n\nSistema iniciado ✅\n\nMódulos encontrados:\n\n" + modules.joinToString("\n")
        text.textSize = 22f
        text.setTextColor(Color.WHITE)
        text.setBackgroundColor(Color.BLACK)
        text.gravity = android.view.Gravity.CENTER

        setContentView(text)
    }
}

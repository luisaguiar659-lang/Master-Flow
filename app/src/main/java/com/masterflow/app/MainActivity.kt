package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.content.Intent
import android.graphics.Color
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.masterflow.app.modules.ModuleManager

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = android.view.Gravity.CENTER
        layout.setPadding(40, 40, 40, 40)
        layout.setBackgroundColor(Color.BLACK)

        val title = TextView(this)
        title.text = "XCORE\n\nSistema iniciado ✅"
        title.textSize = 26f
        title.setTextColor(Color.WHITE)
        title.gravity = android.view.Gravity.CENTER

        layout.addView(title)

        val modules = ModuleManager().getModules()

        modules.forEach { module ->
            val button = Button(this)
            button.text = module
            button.setOnClickListener {
                val intent = Intent(this, XcoreModuleActivity::class.java)
                intent.putExtra("module", module)
                startActivity(intent)
            }
            layout.addView(button)
        }

        setContentView(layout)
    }
}

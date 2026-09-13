package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.content.Intent
import android.graphics.Color
import android.view.Gravity
import android.widget.*

import com.masterflow.app.modules.ModuleManager

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = Gravity.CENTER
        layout.setPadding(40,40,40,40)
        layout.setBackgroundColor(Color.BLACK)

        val logo = ImageView(this)
        logo.setImageResource(com.masterflow.app.R.drawable.xcore_icon)
        layout.addView(logo, LinearLayout.LayoutParams(300,300))

        val title = TextView(this)
        title.text = "XCORE"
        title.textSize = 30f
        title.setTextColor(Color.WHITE)
        title.gravity = Gravity.CENTER
        layout.addView(title)

        val subtitle = TextView(this)
        subtitle.text = "Central de Automação"
        subtitle.textSize = 16f
        subtitle.setTextColor(Color.GRAY)
        subtitle.gravity = Gravity.CENTER
        layout.addView(subtitle)

        val modules = ModuleManager().getModules()

        modules.forEach { module ->

            val button = Button(this)
            button.text = "${module.name}\n${module.status}"
            button.setTextColor(Color.WHITE)
            button.setBackgroundColor(Color.rgb(180,0,0))

            button.setOnClickListener {
                val intent = Intent(this, XcoreModuleActivity::class.java)

                intent.putExtra("name", module.name)
                intent.putExtra("description", module.description)
                intent.putExtra("version", module.version)
                intent.putExtra("status", module.status)

                startActivity(intent)
            }

            val params = LinearLayout.LayoutParams(-1,120)
            params.setMargins(0,20,0,0)
            layout.addView(button, params)
        }

        setContentView(layout)
    }
}

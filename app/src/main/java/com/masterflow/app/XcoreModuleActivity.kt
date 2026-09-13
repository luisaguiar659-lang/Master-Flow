package com.masterflow.app

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.*

class XcoreModuleActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val module =
            intent.getStringExtra("module") ?: "XCORE"


        val layout = LinearLayout(this)

        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = Gravity.CENTER
        layout.setPadding(40,40,40,40)
        layout.setBackgroundColor(Color.BLACK)


        val title = TextView(this)

        title.text = "XCORE"
        title.textSize = 32f
        title.setTextColor(Color.WHITE)
        title.gravity = Gravity.CENTER

        layout.addView(title)


        val moduleName = TextView(this)

        moduleName.text = module
        moduleName.textSize = 24f
        moduleName.setTextColor(
            Color.rgb(255,0,0)
        )

        moduleName.gravity = Gravity.CENTER


        layout.addView(moduleName)


        val status = TextView(this)

        status.text =
            "Módulo carregado ✅"

        status.textSize = 18f

        status.setTextColor(
            Color.LTGRAY
        )

        status.gravity = Gravity.CENTER


        layout.addView(status)



        if(module == "XCORE IBO") {

            val info = TextView(this)

            info.text =
                "\nGerenciamento IBO\nAutomação e controle"

            info.setTextColor(Color.WHITE)

            info.textSize = 16f

            info.gravity = Gravity.CENTER

            layout.addView(info)

        }



        if(module == "XCORE CLOUD") {

            val info = TextView(this)

            info.text =
                "\nCloud System\nServiços online"

            info.setTextColor(Color.WHITE)

            info.textSize = 16f

            info.gravity = Gravity.CENTER

            layout.addView(info)

        }


        setContentView(layout)

    }
}

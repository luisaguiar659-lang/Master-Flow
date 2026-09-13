package com.masterflow.app.modules.cloud

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.*

class XcloudDevicesActivity : Activity() {

    private val manager = XcloudDeviceManager()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.setPadding(40,40,40,40)
        layout.gravity = Gravity.CENTER
        layout.setBackgroundColor(Color.BLACK)

        val title = TextView(this)
        title.text = "XCORE CLOUD - DEVICES"
        title.textSize = 24f
        title.setTextColor(Color.WHITE)
        layout.addView(title)

        val input = EditText(this)
        input.hint = "Identificador do dispositivo"
        layout.addView(input)

        val add = Button(this)
        add.text = "ADICIONAR DEVICE"
        add.setOnClickListener {
            manager.addDevice(input.text.toString())
            Toast.makeText(this, "Device adicionado", Toast.LENGTH_SHORT).show()
        }
        layout.addView(add)

        val list = TextView(this)
        list.setTextColor(Color.WHITE)
        list.text = "Dispositivos: ${manager.listDevices().size}"
        layout.addView(list)

        setContentView(layout)
    }
}

package com.masterflow.app.modules.ibo

class XcoreIboModule {

    val name = "XCORE IBO"

    val version = "1.2.3"

    var enabled = true
        private set

    fun start(): String {
        enabled = true
        return "XCORE IBO iniciado"
    }

    fun stop(): String {
        enabled = false
        return "XCORE IBO parado"
    }

    fun status(): String {
        return if (enabled) "ONLINE" else "OFFLINE"
    }
}

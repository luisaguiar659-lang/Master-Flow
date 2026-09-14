package com.masterflow.app.modules

import com.masterflow.app.modules.cloud.XcloudEngine
import com.masterflow.app.modules.ibo.IboEngine

class IntegrationRegistry {

    private val engines = mapOf(
        "xcore_cloud" to XcloudEngine(),
        "xcore_ibo" to IboEngine()
    )

    fun start(id: String): Boolean {
        engines[id]?.start()
        return engines[id]?.isRunning() ?: false
    }

    fun stop(id: String) {
        engines[id]?.stop()
    }

    fun status(id: String): String {
        return if (engines[id]?.isRunning() == true) "ONLINE" else "OFFLINE"
    }
}

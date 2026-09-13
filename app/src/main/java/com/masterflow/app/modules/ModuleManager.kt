package com.masterflow.app.modules

import com.masterflow.app.modules.cloud.XcloudEngine
import com.masterflow.app.modules.ibo.IboEngine

class ModuleManager {

    private val iboEngine = IboEngine()
    private val xcloudEngine = XcloudEngine()

    fun getModules(): List<Module> {
        return listOf(
            Module(
                id = "xcore_cloud",
                name = "XCORE CLOUD",
                description = "Sistema de automação em nuvem",
                version = "1.0",
                status = getCloudStatus()
            ),

            Module(
                id = "xcore_ibo",
                name = "XCORE IBO",
                description = "Gerenciamento de dispositivos IBO",
                version = "1.0",
                status = getIboStatus()
            )
        )
    }

    fun startModules() {
        iboEngine.start()
        xcloudEngine.start()
    }

    fun stopModules() {
        iboEngine.stop()
        xcloudEngine.stop()
    }

    private fun getIboStatus(): String {
        return if (iboEngine.isRunning()) "ONLINE" else "OFFLINE"
    }

    private fun getCloudStatus(): String {
        return if (xcloudEngine.isRunning()) "ONLINE" else "OFFLINE"
    }
}

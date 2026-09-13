package com.masterflow.app.modules

class ModuleManager {

    fun getModules(): List<Module> {
        return listOf(
            Module(
                id = "xcore_cloud",
                name = "XCORE CLOUD",
                description = "Sistema de automação em nuvem",
                version = "1.0",
                status = "ONLINE"
            ),

            Module(
                id = "xcore_ibo",
                name = "XCORE IBO",
                description = "Gerenciamento de dispositivos IBO",
                version = "1.0",
                status = "ONLINE"
            )
        )
    }
}

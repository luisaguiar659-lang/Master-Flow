package com.masterflow.app.core

import com.masterflow.app.modules.Module

object ModuleManager {

    private val modules = listOf(
        Module(
            id = "xcore_ibo",
            name = "XCORE IBO",
            description = "Modulo XCORE IBO",
            version = "1.0",
            status = "ready"
        ),
        Module(
            id = "xcore_cloud",
            name = "XCORE CLOUD",
            description = "Modulo XCORE CLOUD",
            version = "1.0",
            status = "ready"
        )
    )

    fun getModules(): List<Module> {
        return modules
    }
}

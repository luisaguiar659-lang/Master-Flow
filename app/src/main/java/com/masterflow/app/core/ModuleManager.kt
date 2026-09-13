package com.masterflow.app.core

import com.masterflow.app.modules.Module

object ModuleManager {

    private val modules = listOf(
        Module(
            id = "xcore_ibo",
            name = "XCORE IBO",
            status = "ready"
        ),
        Module(
            id = "xcore_cloud",
            name = "XCORE CLOUD",
            status = "ready"
        )
    )

    fun getModules(): List<Module> {
        return modules
    }
}

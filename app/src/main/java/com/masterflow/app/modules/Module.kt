package com.masterflow.app.modules

data class Module(
    val id: String,
    val name: String,
    val description: String,
    val version: String,
    val status: String
)

interface ModuleEngine {
    fun start(): Boolean
    fun stop()
}

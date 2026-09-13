package com.masterflow.app.modules.cloud

class XcloudEngine {

    private var running = false

    fun start() {
        running = true
    }

    fun stop() {
        running = false
    }

    fun isRunning(): Boolean {
        return running
    }

    fun moduleName(): String {
        return "XCORE CLOUD"
    }
}

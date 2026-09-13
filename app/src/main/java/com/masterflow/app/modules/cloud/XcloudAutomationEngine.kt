package com.masterflow.app.modules.cloud

class XcloudAutomationEngine {

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
}

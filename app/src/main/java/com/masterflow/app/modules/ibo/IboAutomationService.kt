package com.masterflow.app.modules.ibo

class IboAutomationService {

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

package com.masterflow.app.modules.cloud

class XcloudDeviceManager {

    private val devices = mutableListOf<String>()

    fun addDevice(identifier: String) {
        if (identifier.isNotEmpty()) {
            devices.add(identifier)
        }
    }

    fun removeDevice(identifier: String) {
        devices.remove(identifier)
    }

    fun listDevices(): List<String> {
        return devices
    }

    fun clear() {
        devices.clear()
    }
}

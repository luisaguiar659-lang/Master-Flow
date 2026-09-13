package com.masterflow.app.modules.cloud

class XcloudMacManager {

    private val macs = mutableListOf<String>()

    fun add(mac: String) {
        if (mac.isNotBlank() && !macs.contains(mac)) {
            macs.add(mac)
        }
    }

    fun remove(mac: String) {
        macs.remove(mac)
    }

    fun list(): List<String> {
        return macs
    }

    fun clear() {
        macs.clear()
    }
}

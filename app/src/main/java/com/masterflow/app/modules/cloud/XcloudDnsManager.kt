package com.masterflow.app.modules.cloud

class XcloudDnsManager {

    private var dns: String = ""

    fun setDns(value: String) {
        dns = value
    }

    fun getDns(): String {
        return dns
    }

    fun clear() {
        dns = ""
    }
}

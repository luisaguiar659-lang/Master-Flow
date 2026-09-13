package com.masterflow.app.modules.cloud

class XcloudResellerManager {

    private val resellers = mutableListOf<String>()

    fun addReseller(name: String) {
        if (name.isNotBlank()) {
            resellers.add(name)
        }
    }

    fun removeReseller(name: String) {
        resellers.remove(name)
    }

    fun listResellers(): List<String> {
        return resellers.toList()
    }
}

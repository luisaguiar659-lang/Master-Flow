package com.masterflow.app.modules.ibo

class IboWebController {

    private var logged = false

    fun login(email: String, password: String): Boolean {
        if (email.isBlank() || password.isBlank()) {
            return false
        }

        logged = true
        return true
    }

    fun logout() {
        logged = false
    }

    fun isLogged(): Boolean {
        return logged
    }

    fun canOpen(url: String): Boolean {
        return IboConfig.allowedHosts.any { host ->
            url.contains(host)
        }
    }
}

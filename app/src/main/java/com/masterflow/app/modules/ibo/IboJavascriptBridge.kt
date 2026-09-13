package com.masterflow.app.modules.ibo

class IboJavascriptBridge {

    private var loggedIn = false

    fun login(user: String, password: String): Boolean {
        loggedIn = user.isNotEmpty() && password.isNotEmpty()
        return loggedIn
    }

    fun logout() {
        loggedIn = false
    }

    fun isLogged(): Boolean {
        return loggedIn
    }
}

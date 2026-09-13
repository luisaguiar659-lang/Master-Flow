package com.masterflow.app.modules.ibo

class IboJavascriptBridge(
    private val sessionManager: IboSessionManager
) {

    fun login(user: String, password: String): Boolean {
        val success = user.isNotEmpty() && password.isNotEmpty()

        if (success) {
            sessionManager.login(user)
        }

        return success
    }

    fun logout() {
        sessionManager.logout()
    }

    fun isLogged(): Boolean {
        return sessionManager.isAuthenticated()
    }

    fun getUser(): String {
        return sessionManager.getUser()
    }
}

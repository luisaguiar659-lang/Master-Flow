package com.masterflow.app.modules.ibo

class IboSessionManager {

    private var authenticated = false
    private var email = ""

    fun login(user: String) {
        email = user
        authenticated = true
    }

    fun logout() {
        email = ""
        authenticated = false
    }

    fun isAuthenticated(): Boolean {
        return authenticated
    }

    fun getUser(): String {
        return email
    }
}

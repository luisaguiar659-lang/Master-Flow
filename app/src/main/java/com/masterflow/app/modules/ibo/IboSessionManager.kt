package com.masterflow.app.modules.ibo

import android.content.Context

class IboSessionManager(private val context: Context) {

    private val prefs = context.getSharedPreferences(
        "xcore_ibo_session",
        Context.MODE_PRIVATE
    )

    fun login(user: String, token: String = "") {
        prefs.edit()
            .putString("email", user)
            .putString("token", token)
            .putBoolean("authenticated", true)
            .apply()
    }

    fun logout() {
        prefs.edit().clear().apply()
    }

    fun isAuthenticated(): Boolean {
        return prefs.getBoolean("authenticated", false)
    }

    fun getUser(): String {
        return prefs.getString("email", "") ?: ""
    }

    fun getToken(): String {
        return prefs.getString("token", "") ?: ""
    }
}

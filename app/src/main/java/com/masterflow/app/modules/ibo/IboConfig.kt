package com.masterflow.app.modules.ibo

object IboConfig {
    const val BASE_URL = "https://gerenciaapp.top/"
    const val PANEL_URL = "https://gerenciaapp.top/dashboard"
    const val LOGIN_URL = "https://gerenciaapp.top/login"
    const val DASHBOARD_URL = PANEL_URL
    const val MODULE_VERSION = "1.2.3"

    val allowedHosts = setOf(
        "gerenciaapp.top",
        "www.gerenciaapp.top"
    )
}

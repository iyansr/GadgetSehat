package com.gadgetsehat

public abstract class ScreenTimeConfig {
    companion object {
        const val INTERVAL_DAILY = "daily"
        const val INTERVAL_HOURLY = "hourly"
        const val INTERVAL_WEEKLY = "weekly"
        const val INTERVAL_MONTHLY = "monthly"

        const val ONE_HOUR = 1000 * 60 * 60
        const val ONE_DAY = ONE_HOUR * 24
        const val ONE_WEEK = ONE_DAY * 7
    }
}
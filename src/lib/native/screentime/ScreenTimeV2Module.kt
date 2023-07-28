package com.gadgetsehat

import android.app.AppOpsManager
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.hermes.intl.IPlatformCollator.Usage
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream
import java.util.*
import kotlin.Comparator

class ScreenTimeV2Module(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ScreenTime"
    }
    data class AppUsage(val appName: String, val packageName: String, val usageTime: Long, val icon: Drawable?)

    private val usageStatsManager = reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    private val packageManager = reactContext.packageManager

    @ReactMethod
    fun getTotalScreenTime(start: Double, end: Double, promise: Promise) {
        try {
           val usageStatsList = getUsageStats(start, end)
            var totalScreenTime: Long = 0

            for (usageStats in usageStatsList) {
                val totalTimeInForeground = usageStats.totalTimeInForeground
                totalScreenTime += totalTimeInForeground
            }

            promise.resolve(totalScreenTime.toDouble())
        } catch (e : Exception) {
            promise.reject("Error getTotalScreenTime", e)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun getAppList(start: Double, end: Double, promise: Promise) {
        try {
            val usageStatsList = getUsageStats(start, end)

            val appUsageMap = TreeMap<String, Long>(UsageComparator())

            for (usageStats in usageStatsList) {
                val packageName = usageStats.packageName
                val totalTimeInForeground = usageStats.totalTimeInForeground
                appUsageMap[packageName] = totalTimeInForeground
            }

            // Prepare the result data
            val appUsageList = ArrayList<AppUsage>()
            for ((packageName, timeInForeground) in appUsageMap) {
                val appInfo = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
                val appIcon = packageManager.getApplicationIcon(appInfo)
                val appName = packageManager.getApplicationLabel(appInfo).toString()
                val appUsage = AppUsage(appName, packageName, timeInForeground, appIcon)
                appUsageList.add(appUsage)
            }

            val appUsageArray = Arguments.createArray()
            for (appUsage in appUsageList) {
                val appUsageObject = Arguments.createMap().apply {
                    putString("appName", appUsage.appName)
                    putString("packageName", appUsage.packageName)
                    putDouble("usageTime", appUsage.usageTime.toDouble())
                    if (appUsage.icon != null) {
                        val iconBase64 = convertDrawableToBase64(appUsage.icon)
                        putString("iconBase64", iconBase64)
                    } else {
                        putString("iconBase64", null)
                    }
                }
                appUsageArray.pushMap(appUsageObject)
            }

            promise.resolve(appUsageArray)
        } catch (e: Exception) {
            promise.reject("Error getting app List", e)
        }
    }

    @ReactMethod
    fun checkPermissionAccess(promise: Promise) {
        return try {
            val appOpsManager = reactContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
            val mode = appOpsManager.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactContext.packageName)
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
        } catch (e: Exception){
            promise.reject("Permission Access Error",e)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun convertDrawableToBase64(drawable: Drawable?): String? {
        if (drawable == null) return null

        val bitmap = drawableToBitmap(drawable)
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
        val imageBytes = outputStream.toByteArray()
        return Base64.getEncoder().encodeToString(imageBytes)
    }


    private fun getUsageStats(start: Double, end: Double): MutableList<UsageStats> {
        val startTime = if (start > 0) start.toLong() else System.currentTimeMillis()
        val endTime = if (end > 0) end.toLong() else startTime - 1000 * 60 * 60 * 24
        return usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_BEST, endTime, startTime)
    }

    private fun drawableToBitmap(drawable: Drawable): Bitmap {
        if (drawable is BitmapDrawable) {
            return drawable.bitmap
        }

        val intrinsicWidth = drawable.intrinsicWidth
        val intrinsicHeight = drawable.intrinsicHeight

        val bitmap = Bitmap.createBitmap(intrinsicWidth, intrinsicHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }


    private class UsageComparator : Comparator<String> {
        override fun compare(packageName1: String, packageName2: String): Int {
            return packageName1.compareTo(packageName2, ignoreCase = true)
        }
    }
}
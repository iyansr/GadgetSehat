package com.gadgetsehat

import android.app.AppOpsManager
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.provider.Settings
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream
import java.util.Base64
import java.util.TreeMap
import kotlin.Comparator

class ScreenTimeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenTimeModule"
    }

    data class AppUsage(val appName: String, val packageName: String, val usageTime: Long, val icon: Drawable?)

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun getScreenTime(promise: Promise) {
       try {
           val usageStatsManager = reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
           val packageManager = reactContext.packageManager
           val endTime = System.currentTimeMillis()
           val startTime = endTime - 1000 * 60 * 60 * 24 // Get stats from the last 24 hours

           val usageStatsList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime)

           val appUsageMap = TreeMap<String, Long>(UsageComparator())
           var totalScreenTime: Long = 0

           if (usageStatsList != null) {
               for (usageStats in usageStatsList) {
                   val packageName = usageStats.packageName
                   val totalTimeInForeground = usageStats.totalTimeInForeground

                   appUsageMap[packageName] = totalTimeInForeground
                   totalScreenTime += totalTimeInForeground
               }
           }

           // Prepare the result data
           val appUsageList = ArrayList<AppUsage>()

           for ((packageName, timeInForeground) in appUsageMap) {
               val appName = getAppName(packageName, packageManager)
               val appIcon = getAppIcon(packageName, packageManager)

               val appUsage = AppUsage(appName, packageName, timeInForeground, appIcon)
               appUsageList.add(appUsage)
           }

           // Emit the event to React Native
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

           val resultData = Arguments.createMap().apply {
               putDouble("totalScreenTime", totalScreenTime.toDouble())
               putArray("appUsageList", appUsageArray)
           }

           promise.resolve(resultData)
       } catch (e: Exception) {
           promise.reject("Error fetching screen time:", e)
       }
    }

    private fun getAppName(packageName: String, packageManager: PackageManager): String {
        return try {
            val applicationInfo = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
            packageManager.getApplicationLabel(applicationInfo).toString()
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
            packageName
        }
    }

    private fun getAppIcon(packageName: String, packageManager: PackageManager): Drawable? {
        return try {
            val applicationInfo = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
            packageManager.getApplicationIcon(applicationInfo)
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
            null
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

    @ReactMethod
    fun openUsageSettings() {
        val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        val packageManager = reactContext.packageManager
        if (intent.resolveActivity(packageManager) != null) {
            reactContext.startActivity(intent)
        }
    }

    @ReactMethod
    fun checkPermissionAccess(promise: Promise) {
        try {
            val appOpsManager = reactContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
            val mode = appOpsManager.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactContext.packageName)
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
        } catch (e: Exception){
            promise.reject("Error check permission:", e)
        }

    }

    private class UsageComparator : Comparator<String> {
        override fun compare(packageName1: String, packageName2: String): Int {
            return packageName1.compareTo(packageName2, ignoreCase = true)
        }
    }
}

package com.gadgetsehat

import android.app.AppOpsManager
import android.app.usage.UsageEvents
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
    @ReactMethod
    fun getTimeSpent(start: Double, end: Double, promise: Promise) {
        try {
//            val end = System.currentTimeMillis()
//            val start = end - 1000 * 60 * 60 * 24 // one day ago

            val startTime = if(start > 0) start.toLong() else System.currentTimeMillis()
            val endTime = if(end > 0) end.toLong() else startTime - 1000 * 60 * 60 * 24

            val usageStatsManager = reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            val events = usageStatsManager.queryEvents(endTime, startTime)
            val eventMap = mutableMapOf<String, MutableList<UsageEvents.Event>>()
            while (events.hasNextEvent()) {
                val event = UsageEvents.Event()
                events.getNextEvent(event)
                if (event.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND || event.eventType == UsageEvents.Event.MOVE_TO_BACKGROUND) {
                    eventMap.getOrPut(event.packageName) { mutableListOf() }.add(event)
                }
            }
            val screenTimeMap = mutableMapOf<String, Long>()
            for ((packageName, eventList) in eventMap) {
                var screenTime = 0L
                var lastEvent: UsageEvents.Event? = null
                for (event in eventList) {
                    if (event.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND) {
                        lastEvent = event
                    } else if (event.eventType == UsageEvents.Event.MOVE_TO_BACKGROUND && lastEvent != null) {
                        screenTime += event.timeStamp - lastEvent.timeStamp
                        lastEvent = null
                    }
                }
                screenTimeMap[packageName] = screenTime
            }

            var timeSpent = 0L

            for ((_, duration) in screenTimeMap){
              timeSpent += duration
            }
            promise.resolve(timeSpent.toDouble())
        } catch (e: Exception) {
            promise.reject("Error: getTimeSpent", e)
        }

    }

    @RequiresApi(Build.VERSION_CODES.Q)
    @ReactMethod
    fun getTotalScreenTime(start: Double, end: Double, promise: Promise) {
        try {
            val usageStatsManager = reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

            val startTime = if(start > 0) start.toLong() else System.currentTimeMillis()
            val endTime = if(end > 0) end.toLong() else startTime - 1000 * 60 * 60 * 24

            val usageStatsList = usageStatsManager.queryAndAggregateUsageStats(endTime, startTime)

            var totalScreenTime: Long = 0

            for ((_, usageStats) in usageStatsList) {
                val totalTimeInForeground = usageStats.totalTimeVisible
                totalScreenTime += totalTimeInForeground
            }
            promise.resolve(totalScreenTime.toDouble())
        } catch (e : Exception) {
            promise.reject("Error", e)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun getScreenTime(interval: Double, start: Double, end: Double, promise: Promise) {
       try {
           val usageStatsManager = reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
           val packageManager = reactContext.packageManager
           val startTime = if(start > 0) start.toLong() else System.currentTimeMillis()
           val endTime = if(end > 0) end.toLong() else startTime - 1000 * 60 * 60 * 24

           val usageStatsList = usageStatsManager.queryUsageStats(interval.toInt(), endTime, startTime)

           val appUsageMap = TreeMap<String, Long>(UsageComparator())
           val hourlyScreenTimeMap = TreeMap<Long, Long>()
           var totalScreenTime = 0L

           if (usageStatsList != null) {
               for (usageStats in usageStatsList) {
                   val packageName = usageStats.packageName
                   val totalTimeInForeground = usageStats.totalTimeInForeground
                   val hourlyMark = startTime + ((usageStats.firstTimeStamp - startTime) / (1000 * 60 * 60)) * (1000 * 60 * 60)
                   hourlyScreenTimeMap[hourlyMark] = hourlyScreenTimeMap.getOrDefault(hourlyMark, 0) + totalTimeInForeground
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

           var hourlyStartTime = startTime
           while (hourlyStartTime < endTime) {
               if(!hourlyScreenTimeMap.containsKey(hourlyStartTime)) {
                   hourlyScreenTimeMap[hourlyStartTime] = 0
               }
               hourlyStartTime += 1000 * 60 * 60
           }

           val screenTimeArray = Arguments.createArray()
           for((hourlyMark, screenTime) in hourlyScreenTimeMap) {
               val screenTimeObj = Arguments.createMap().apply {
                   putDouble("hourlyMark", hourlyMark.toDouble())
                   putDouble("screenTime", screenTime.toDouble())
               }

               screenTimeArray.pushMap(screenTimeObj)
           }

           val resultData = Arguments.createMap().apply {
               putDouble("totalScreenTime", totalScreenTime.toDouble())
               putArray("appUsageList", appUsageArray)
               putArray("hourlyUsage", screenTimeArray)
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
            val appIcon = packageManager.getApplicationIcon(packageName)
            val defaultIcon = packageManager.defaultActivityIcon

             if(appIcon is Drawable) appIcon else defaultIcon
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
        return try {
            val appOpsManager = reactContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
            val mode = appOpsManager.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactContext.packageName)
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
        } catch (e: Exception){
            promise.reject("Error",e)
        }
    }

    private class UsageComparator : Comparator<String> {
        override fun compare(packageName1: String, packageName2: String): Int {
            return packageName1.compareTo(packageName2, ignoreCase = true)
        }
    }
}

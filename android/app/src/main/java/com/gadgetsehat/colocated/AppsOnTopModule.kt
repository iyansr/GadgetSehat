package com.gadgetsehat

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppsOnTopModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AppsOnTop"
    }

    @ReactMethod
    fun openAppsOnTopSettings() {
        val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION ,Uri.parse("package:" + reactContext.packageName))
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        val packageManager = reactContext.packageManager
        if (intent.resolveActivity(packageManager) != null) {
            reactContext.startActivity(intent)
        }
    }

    @RequiresApi(Build.VERSION_CODES.M)
    @ReactMethod
    fun checkAppsOnTopPermissionAccess(promise: Promise) {
        return try {
            promise.resolve(Settings.canDrawOverlays(reactContext))
        } catch (e: Exception){
            promise.reject("Error",e)
        }
    }

}
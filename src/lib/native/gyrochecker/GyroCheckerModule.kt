package com.gadgetsehat

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GyroCheckerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "GyroCheckerModule"
    }

    @ReactMethod
    fun hasGyroscope(promise: Promise) {
        try {
            val sensorManager = reactApplicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
            val gyroscopeSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
            promise.resolve(gyroscopeSensor != null)
        } catch (e: Exception) {
            promise.reject("GyroscopeCheck error", e)
        }
    }
}

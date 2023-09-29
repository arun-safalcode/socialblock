package com.socialblocker;

import android.Manifest;
import android.app.Activity;
import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OverlayPermissionModule extends ReactContextBaseJavaModule {
    private static final int NOTIFICATION_PERMISSION_CODE = 1001;
    private static final int OVERLAY_PERMISSION_CODE = 1002;
    private static final int USAGE_ACCESS_PERMISSION_CODE = 1003;

    private static ReactApplicationContext reactContext;

    public OverlayPermissionModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "OverlayPermission";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void requestNotificationPermission(final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.ACCESS_NOTIFICATION_POLICY)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(currentActivity,
                        new String[]{Manifest.permission.ACCESS_NOTIFICATION_POLICY},
                        NOTIFICATION_PERMISSION_CODE);
            } else {
                // Permission is already granted
                promise.resolve(true);
            }
        } else {
            // Activity is null, cannot request permission
            promise.resolve(false);
        }
    }

    @ReactMethod
    public boolean requestOverlayPermission() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(currentActivity)) {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                            Uri.parse("package:" + currentActivity.getPackageName()));
                    currentActivity.startActivityForResult(intent, OVERLAY_PERMISSION_CODE);
                }else{
                    return true;
                }
            }
        }
        return false;
    }

    @ReactMethod
    public void requestUsageAccessPermission() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            currentActivity.startActivityForResult(intent, USAGE_ACCESS_PERMISSION_CODE);
        }
    }

    @ReactMethod
    public void requestAccessibilityPermission() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
            currentActivity.startActivity(intent);
        }
    }


    @ReactMethod
    public void checkUsageAccessPermission(final Promise promise) {
        AppOpsManager appOps = (AppOpsManager) reactContext.getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactContext.getPackageName());

        if (mode == AppOpsManager.MODE_ALLOWED) {
            // Permission granted
            promise.resolve(true);
        } else {
            // Permission not granted
            promise.resolve(false);
        }
    }
}

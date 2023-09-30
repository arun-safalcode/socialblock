package com.socialblocker;

import static androidx.core.app.ActivityCompat.startActivityForResult;

import android.Manifest;
import android.app.Activity;
import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OverlayPermissionModule extends ReactContextBaseJavaModule {
    private static final int REQUEST_NOTIFICATION_ACCESS = 1;
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
    public boolean requestNotificationAccess() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(currentActivity)) {
                    Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS,
                            Uri.parse("package:" + currentActivity.getPackageName()));
                    currentActivity.startActivityForResult(intent, REQUEST_NOTIFICATION_ACCESS);

                }else{
                    Toast.makeText(currentActivity, "Notification Access Permission Granted", Toast.LENGTH_SHORT).show();
                }
            }else{
                Toast.makeText(currentActivity, "Notification Access Permission Not Granted", Toast.LENGTH_SHORT).show();
            }
        }
        return false;
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
                    Toast.makeText(currentActivity, "Display Over Other Access Permission Granted", Toast.LENGTH_SHORT).show();
                }
            }else{
                Toast.makeText(currentActivity, "Display Over Other Access Permission Not Granted", Toast.LENGTH_SHORT).show();

            }
        }
        return false;
    }

    @ReactMethod
    public void requestUsageAccessPermission() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(currentActivity)) {
                    Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
                    currentActivity.startActivityForResult(intent, USAGE_ACCESS_PERMISSION_CODE);
                }else{
                    Toast.makeText(currentActivity, "Usage Access Permission Granted", Toast.LENGTH_SHORT).show();
                }
            }
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
    public void checkAndRequestPermission() {
        if (!isNotificationListenerEnabled()) {
            Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        }
    }

    private boolean isNotificationListenerEnabled() {
        String packageName = reactContext.getPackageName();
        String flat = Settings.Secure.getString(
                reactContext.getContentResolver(),
                "enabled_notification_listeners"
        );
        return flat != null && flat.contains(packageName);
    }

}

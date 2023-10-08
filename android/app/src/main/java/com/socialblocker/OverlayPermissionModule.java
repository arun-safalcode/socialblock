package com.socialblocker;

import static androidx.core.app.ActivityCompat.startActivityForResult;

import android.Manifest;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.AppOpsManager;
import android.app.admin.DevicePolicyManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.provider.Settings;
import android.widget.Toast;
import android.os.Process;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.socialblocker.shared.SharedPrefUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class OverlayPermissionModule extends ReactContextBaseJavaModule {
    private static final int REQUEST_NOTIFICATION_ACCESS = 1;
    private static final int OVERLAY_PERMISSION_CODE = 1002;
    private static final int USAGE_ACCESS_PERMISSION_CODE = 1003;
    private static final int WRITE_SETTINGS_PERMISSION_CODE = 1;
    private static final int WRITE_SECURE_SETTINGS_PERMISSION_CODE = 2;
    private static final int REQUEST_DEVICE_ADMIN_PERMISSION = 1004;
    private static final String KILL_EVENT = "AppKilled";
    private PackageManager packageManager;
    private HandlerThread handlerThread;
    private Handler handler;
    private static final int PERMISSION_REQUEST_CODE = 123;

    private List<String> lockedApps = new ArrayList<>();

    private static final int COMPONENT_ENABLED_STATE_PERMISSION_CODE = 456; // Define this constant

    private static ReactApplicationContext reactContext;
//    private final BroadcastReceiver appKilledReceiver;
    public OverlayPermissionModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
//        this.packageManager = reactContext.getPackageManager();
//        this.handlerThread = new HandlerThread("PackageDisablerThread");
//        this.handlerThread.start();
//        this.handler = new Handler(handlerThread.getLooper());
//        // Register a BroadcastReceiver to listen for the app killed event
//        appKilledReceiver = new BroadcastReceiver() {
//            @Override
//            public void onReceive(Context context, Intent intent) {
//                // Send a notification to React Native that the app was killed
//                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(KILL_EVENT, null);
//            }
//        };
//        // Register the BroadcastReceiver to listen for ACTION_PACKAGE_REMOVED
//        IntentFilter intentFilter = new IntentFilter();
//        intentFilter.addAction(Intent.ACTION_PACKAGE_REMOVED);
//        intentFilter.addDataScheme("package");
//        reactContext.registerReceiver(appKilledReceiver, intentFilter);
    }

    @Override
    public String getName() {
        return "OverlayPermission";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)

    @ReactMethod
    public void requestOverlayPermission(Callback callback) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(currentActivity)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + currentActivity.getPackageName()));
                currentActivity.startActivityForResult(intent, OVERLAY_PERMISSION_CODE);
                callback.invoke(false); // Permission not granted yet
            } else {
//                Toast.makeText(currentActivity, "Display Over Other Access Permission Granted", Toast.LENGTH_SHORT).show();
                callback.invoke(true); // Permission already granted
            }
        } else {
            callback.invoke(false); // Default case
        }
    }

    @ReactMethod
    public void requestUsageAccessPermission(Callback callback) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            AppOpsManager appOps = (AppOpsManager) currentActivity.getSystemService(Context.APP_OPS_SERVICE);
            int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), currentActivity.getPackageName());
            if (mode != AppOpsManager.MODE_ALLOWED) {
                Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
                currentActivity.startActivityForResult(intent, USAGE_ACCESS_PERMISSION_CODE);
                callback.invoke(false); // Permission not granted yet
            } else {
//                Toast.makeText(currentActivity, "Usage Access Permission Granted", Toast.LENGTH_SHORT).show();
                callback.invoke(true); // Permission already granted
            }
        }else{
            callback.invoke(false); // Default case or permission not granted for older Android versions
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
    public void startBlockingService(ReadableArray packageNames) {
        lockedApps.clear();
        for (int i = 0; i < packageNames.size(); i++) {
            lockedApps.add(packageNames.getString(i));
        }
        SharedPrefUtil prefUtil = new SharedPrefUtil(reactContext);
        prefUtil.createLockedAppsList(lockedApps);

        Intent intent = new Intent(getReactApplicationContext(), SocialMediaBlockService.class);
        getReactApplicationContext().startService(intent);
    }


    @ReactMethod
    public void stopBlockingService() {
        lockedApps.clear();
        SharedPrefUtil prefUtil = new SharedPrefUtil(reactContext);
        prefUtil.createLockedAppsList(lockedApps);
        // Stop the blocking service
        Intent intent = new Intent(getReactApplicationContext(), SocialMediaBlockService.class);
        getReactApplicationContext().stopService(intent);
    }


}

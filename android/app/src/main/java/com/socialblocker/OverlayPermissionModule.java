package com.socialblocker;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.AppOpsManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Process;
import android.provider.Settings;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.socialblocker.shared.SharedPrefUtil;

import java.util.ArrayList;
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

        if (!isServiceRunning(SocialMediaBlockService.class)) {
            // Service is not running, start it
            Intent intent = new Intent(getReactApplicationContext(), SocialMediaBlockService.class);
            getReactApplicationContext().startService(intent);
        }
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

    private boolean isServiceRunning(Class<? extends Service> serviceClass) {
        ActivityManager manager = (ActivityManager) reactContext.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }


    @ReactMethod
    public void isMyAccessibilityServiceEnabled(Callback callback) {
        String packageName = getReactApplicationContext().getPackageName();
        String service = packageName + "/"+packageName+".MyAccessibilityService";
        boolean enabled = false;

        try {
            int accessibilityEnabled = Settings.Secure.getInt(
                    getReactApplicationContext().getContentResolver(),
                    Settings.Secure.ACCESSIBILITY_ENABLED
            );

            if (accessibilityEnabled == 1) {
                String services = Settings.Secure.getString(
                        getReactApplicationContext().getContentResolver(),
                        Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
                );
                if (services != null) {
                    String[] enabledServices = services.split(":");
                    for (String enabledService : enabledServices) {
                        if (enabledService.equals(service)) {
                            enabled = true;
                            break;
                        }
                    }
                }
            }
        } catch (Settings.SettingNotFoundException e) {
            // Handle exception as needed
        }

        callback.invoke(enabled);
    }

}

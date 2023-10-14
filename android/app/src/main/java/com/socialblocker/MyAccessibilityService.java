package com.socialblocker;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

import com.socialblocker.shared.SharedPrefUtil;

import java.util.List;

public class MyAccessibilityService extends AccessibilityService {
    private static final String TAG = "MyAccessibilityService";
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        String packgeName = event.getPackageName().toString();
        PackageManager packageManager = this.getPackageManager();
        try {
            ApplicationInfo applicationInfo = packageManager.getApplicationInfo(packgeName, 0);
            CharSequence applicationLabel = packageManager.getApplicationLabel(applicationInfo);
            SharedPrefUtil prefUtil = new SharedPrefUtil(this);
            List<String> lockedApps = prefUtil.getLockedAppsList();
            // Check if the running app is in the lockedApps list and block it
            if (lockedApps.contains(packgeName)) {
                prefUtil.clearLastApp();
                prefUtil.setLastApp(packgeName);
                killThisPackageIfRunning(this, packgeName);
            }

        } catch (PackageManager.NameNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void onInterrupt() {
        Toast.makeText(this, "onInterrupt something went wrong...", Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onServiceConnected() {
        super.onServiceConnected();
        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        info.eventTypes = AccessibilityEvent.TYPE_VIEW_CLICKED |
                AccessibilityEvent.TYPE_VIEW_FOCUSED |
                AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED;  // Add TYPE_VIEW_TEXT_CHANGED to capture text changes.
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN;
        info.notificationTimeout = 1000;
        this.setServiceInfo(info);

    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    public static void killThisPackageIfRunning(final Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(startMain);
        activityManager.killBackgroundProcesses(packageName);
    }
}

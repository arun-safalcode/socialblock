package com.socialblocker;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

import com.socialblocker.shared.SharedPrefUtil;

import java.util.Arrays;
import java.util.List;

public class MyAccessibilityService extends AccessibilityService {
    private static final String TAG = "MyAccessibilityService";
    private List<String> blockedWebsites = Arrays.asList("facebook.com", "instagram.com", "safalcode.com");
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        String packageName = event.getPackageName() != null ? event.getPackageName().toString() : null;

            SharedPrefUtil prefUtil = new SharedPrefUtil(this);
            List<String> lockedApps = prefUtil.getLockedAppsList();
            // Check if the running app is in the lockedApps list and block it
            if (lockedApps.contains(packageName)) {
                prefUtil.clearLastApp();
                prefUtil.setLastApp(packageName);
                killThisPackageIfRunning(this, packageName);
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
                AccessibilityEvent.TYPES_ALL_MASK|
                AccessibilityEvent.TYPE_VIEW_FOCUSED |
                AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED|
                AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED;  // Add TYPE_VIEW_TEXT_CHANGED to capture text changes.
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN;
        info.flags = AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS |
                AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;
//        info.notificationTimeout = 100000;
        this.setServiceInfo(info);

    }

    public static void killThisPackageIfRunning(final Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(startMain);
        activityManager.killBackgroundProcesses(packageName);
    }


    private boolean isBrowserApp(String packageName) {
        // Add package names for browsers you want to support.
        return packageName.equals("com.android.chrome") || packageName.equals("com.android.browser");
    }
    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

}

package com.socialblocker;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

import com.socialblocker.shared.SharedPrefUtil;

import java.util.ArrayList;
import java.util.List;

public class MyAccessibilityService extends AccessibilityService {
    private static final String TAG = "MyAccessibilityService";
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

        new AccessibilityUtils().filterBrowserURL(event, this, getSupportedBrowsers());

    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "Destroy", Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onInterrupt() {
        Toast.makeText(this, "Interrupt something went wrong...", Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onServiceConnected() {
        super.onServiceConnected();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            AccessibilityServiceInfo info = new AccessibilityServiceInfo();

            // Combine the existing event types with TYPE_VIEW_CLICKED and TYPE_VIEW_FOCUSED
            info.eventTypes = AccessibilityEvent.TYPES_ALL_MASK;
//                    AccessibilityEvent.TYPE_VIEW_CLICKED ;
//                    AccessibilityEvent.TYPE_VIEW_FOCUSED;

//            info.packageNames = packageNames();
            info.feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN | AccessibilityServiceInfo.FEEDBACK_VISUAL;
            info.notificationTimeout = 300;
            info.flags = AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS |
                    AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;
            this.setServiceInfo(info);
        }

        Toast.makeText(this, "Connected", Toast.LENGTH_SHORT).show();

    }

    public static void killThisPackageIfRunning(final Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(startMain);
        activityManager.killBackgroundProcesses(packageName);
    }


    private List<SupportedBrowserConfig> getSupportedBrowsers() {
        List<SupportedBrowserConfig> browsers = new ArrayList<>();
        browsers.add(new SupportedBrowserConfig("com.android.chrome", "com.android.chrome:id/url_bar"));
        browsers.add(new SupportedBrowserConfig("org.mozilla.firefox", "org.mozilla.firefox:id/mozac_browser_toolbar_url_view"));
        browsers.add(new SupportedBrowserConfig("com.opera.browser", "com.opera.browser:id/url_field"));
        browsers.add(new SupportedBrowserConfig("com.opera.mini.native", "com.opera.mini.native:id/url_field"));
        browsers.add(new SupportedBrowserConfig("com.duckduckgo.mobile.android", "com.duckduckgo.mobile.android:id/omnibarTextInput"));
        browsers.add(new SupportedBrowserConfig("com.microsoft.emmx", "com.microsoft.emmx:id/url_bar"));
        browsers.add(new SupportedBrowserConfig("com.coloros.browser", "com.coloros.browser:id/azt"));
        browsers.add(new SupportedBrowserConfig("com.sec.android.app.sbrowser", "com.sec.android.app.sbrowser:id/location_bar_edit_text"));
        return browsers;
    }
//    private String[] packageNames() {
//        List<String> packageNames = new ArrayList<>();
//        for (SupportedBrowserConfig config : getSupportedBrowsers()) {
//            packageNames.add(config.getPackageName());
//        }
//        return packageNames.toArray(new String[0]);
//    }
}

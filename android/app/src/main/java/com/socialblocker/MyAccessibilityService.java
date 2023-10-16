package com.socialblocker;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

import com.socialblocker.shared.SharedPrefUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MyAccessibilityService extends AccessibilityService {
    private static final String TAG = "MyAccessibilityService";
    private List<String> blockedWebsites = Arrays.asList("facebook.com", "instagram.com", "safalcode.com");
    private static MyAccessibilityService instance;

    public static MyAccessibilityService getInstance() {
        return instance;
    }
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
        if (event == null)
            return;

        new AccessibilityUtils().filterBrowserURL(event, this, getSupportedBrowsers());

    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        instance = null;
    }

    @Override
    public void onInterrupt() {
        Toast.makeText(this, "onInterrupt something went wrong...", Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onServiceConnected() {
        super.onServiceConnected();
        instance = this;
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

    private String[] packageNames() {
        List<String> packageNames = new ArrayList<>();
        for (SupportedBrowserConfig config : getSupportedBrowsers()) {
            packageNames.add(config.getPackageName());
        }
        return packageNames.toArray(new String[0]);
    }

}

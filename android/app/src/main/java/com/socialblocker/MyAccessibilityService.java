package com.socialblocker;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.nfc.Tag;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

public class MyAccessibilityService extends AccessibilityService {
    private static final String TAG = "MyAccessibilityService";
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        String packgeName = event.getPackageName().toString();
        PackageManager packageManager = this.getPackageManager();
        try {
            ApplicationInfo applicationInfo = packageManager.getApplicationInfo(packgeName, 0);
            CharSequence applicationLabel = packageManager.getApplicationLabel(applicationInfo);
                Toast.makeText(this, "on data done "+applicationLabel, Toast.LENGTH_SHORT).show();
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
                AccessibilityEvent.TYPE_VIEW_FOCUSED;

        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN;


        // info.flags = AccessibilityServiceInfo.DEFAULT;

        info.notificationTimeout = 1000;

        this.setServiceInfo(info);
        Toast.makeText(this, "onServiceConnect", Toast.LENGTH_SHORT).show();

    }
}

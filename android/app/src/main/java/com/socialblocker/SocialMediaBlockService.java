package com.socialblocker;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.IBinder;
import android.os.Handler;
import android.os.Looper;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

public class SocialMediaBlockService extends Service {

    private static final long BLOCK_DURATION_MILLIS = 6 * 60 * 60 * 1000; // 6 hours
    private static final long CHECK_INTERVAL_MILLIS = 5000; // Check every 5 seconds

    private Handler handler;
    private long startTime;
    private List<String> blockedApps; // List of package names of social media apps to block

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startTime = System.currentTimeMillis();

        // Initialize the list of blocked apps
        blockedApps = new ArrayList<>();
        blockedApps.add("com.facebook.katana");
        blockedApps.add("com.whatsapp");
        blockedApps.add("com.instagram");

        // Start blocking logic
        blockSocialMediaApps();

        // Schedule a task to unblock apps after the specified duration
        handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(() -> unblockSocialMediaApps(), BLOCK_DURATION_MILLIS);

        return START_STICKY;
    }

    private void blockSocialMediaApps() {
        UsageStatsManager usageStatsManager = (UsageStatsManager) getSystemService(USAGE_STATS_SERVICE);

        long endTime = System.currentTimeMillis();
        long startTime = endTime - BLOCK_DURATION_MILLIS;

        // Get the list of usage stats
        List<UsageStats> stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

        // Create a sorted map to find the top foreground app
        SortedMap<Long, UsageStats> sortedMap = new TreeMap<>();
        for (UsageStats usageStats : stats) {
            sortedMap.put(usageStats.getLastTimeUsed(), usageStats);
        }

        // Check if a social media app is in the foreground
        if (!sortedMap.isEmpty()) {
            String topPackageName = sortedMap.get(sortedMap.lastKey()).getPackageName();

//            if (isSocialMediaApp(topPackageName)) {
                // Prevent the social media app from launching
                PackageManager packageManager = getPackageManager();
                packageManager.setApplicationEnabledSetting(topPackageName, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
//            }
        }
    }

    private void unblockSocialMediaApps() {
        // Enable the social media apps again
        PackageManager packageManager = getPackageManager();
        for (String packageName : blockedApps) {
            packageManager.setApplicationEnabledSetting(packageName, PackageManager.COMPONENT_ENABLED_STATE_DEFAULT, PackageManager.DONT_KILL_APP);
        }

        // Stop the service
        stopSelf();
    }

    private boolean isSocialMediaApp(String packageName) {
        // Check if the given package name belongs to a social media app
        return blockedApps.contains(packageName);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // Remove the unblock task if the service is stopped before the duration expires
        if (handler != null) {
            handler.removeCallbacksAndMessages(null);
            Toast.makeText(this, "Data removed", Toast.LENGTH_SHORT).show();
        }
    }
}
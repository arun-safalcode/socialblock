package com.socialblocker;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.widget.Toast;
import android.content.Context;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactInstanceManager;
import com.socialblocker.broadcast.ReceiverApplock;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

public class SocialMediaBlockService extends Service {

    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "SocialBlockerChannel";

    private static final long BLOCK_DURATION_MILLIS = 60000; // 60 seconds

    private Handler handler;
    private long startTime;
    private List<String> blockedApps; // List of package names of social media apps to block
    private List<String> packageNames;
    private ReactInstanceManager reactInstanceManager;
    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startTime = System.currentTimeMillis();
        // Start a background thread to continuously run runApplock
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    runApplock();
                    // Sleep for a short duration to avoid high CPU usage (optional)
                    try {
                        Thread.sleep(100); // Adjust this sleep duration as needed
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
//         Schedule a task to unblock apps after the specified duration
//        handler = new Handler(Looper.getMainLooper());
//        handler.postDelayed(() -> unblockApps(), BLOCK_DURATION_MILLIS);

        startForeground(NOTIFICATION_ID, createNotification());
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unblockApps();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID,
                    "Social Blocker",
                    NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    private Notification createNotification() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Social Blocker Service Running")
                .setContentText("Do some productive work")
                .setSmallIcon(R.drawable.ic_notification)
                .setContentIntent(pendingIntent)
                .build();
    }

    private void runApplock() {
        long endTime = System.currentTimeMillis() + 210;
        while (System.currentTimeMillis() < endTime) {
            synchronized (this) {
                try {
                    Intent intent = new Intent(this, ReceiverApplock.class);
                    sendBroadcast(intent);
                    wait(endTime - System.currentTimeMillis());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void unblockApps() {
        // Stop the service
        stopForeground(true);
        stopSelf();
    }


}

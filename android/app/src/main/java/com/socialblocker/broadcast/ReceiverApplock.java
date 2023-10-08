package com.socialblocker.broadcast;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.socialblocker.ScreenBlocker;
import com.socialblocker.shared.SharedPrefUtil;
import com.socialblocker.utils.Utils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class ReceiverApplock extends BroadcastReceiver {
    Calendar currentTime;
    Calendar fromTime;
    Calendar toTime;
    Calendar currentDay;
    private List<String> lockedApps;
    public static void killThisPackageIfRunning(final Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        Intent startMain = new Intent(Intent.ACTION_MAIN);
        startMain.addCategory(Intent.CATEGORY_HOME);
        startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(startMain);
        activityManager.killBackgroundProcesses(packageName);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onReceive(Context context, Intent intent) {
        Utils utils = new Utils(context);
        SharedPrefUtil prefUtil = new SharedPrefUtil(context);
        List<String> lockedApps = prefUtil.getLockedAppsList();
        String appRunning = utils.getLauncherTopApp();

        //always BLOCK
            if (lockedApps.contains(appRunning)) {
                prefUtil.clearLastApp();
                prefUtil.setLastApp(appRunning);
                killThisPackageIfRunning(context, appRunning);
            }
    }

    public boolean checkTime(String startTimeHour, String startTimeMin, String endTimeHour, String endTimeMin) {
        try {
            currentTime = Calendar.getInstance();
            currentTime.get(Calendar.HOUR_OF_DAY);
            currentTime.get(Calendar.MINUTE);
            fromTime = Calendar.getInstance();
            fromTime.set(Calendar.HOUR_OF_DAY, Integer.valueOf(startTimeHour));
            fromTime.set(Calendar.MINUTE, Integer.valueOf(startTimeMin));
            fromTime.set(Calendar.SECOND, 0);
            fromTime.set(Calendar.MILLISECOND, 0);
            toTime = Calendar.getInstance();
            toTime.set(Calendar.HOUR_OF_DAY, Integer.valueOf(endTimeHour));
            toTime.set(Calendar.MINUTE, Integer.valueOf(endTimeMin));
            toTime.set(Calendar.SECOND, 0);
            toTime.set(Calendar.MILLISECOND, 0);
            if(currentTime.after(fromTime) && currentTime.before(toTime)){
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public boolean checkDay(List<String> weekdays){
        currentDay = Calendar.getInstance();
        String today = LocalDate.now().getDayOfWeek().name();
        if(weekdays.contains(today)){
            return true;
        } else {
            return false;
        }
    }
}

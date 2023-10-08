package com.socialblocker;

import android.content.Intent;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.socialblocker.services.BackgroundManager;

public class SocialMediaBlockerModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;

    public SocialMediaBlockerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SocialMediaBlockerModule";
    }

    @ReactMethod
    public void startBlockingService() {
        Intent intent = new Intent(getReactApplicationContext(), BackgroundManager.class);
        getReactApplicationContext().startService(intent);
    }

    @ReactMethod
    public void stopBlockingService() {
        // Stop the blocking service
        Intent intent = new Intent(getReactApplicationContext(), BackgroundManager.class);
        getReactApplicationContext().stopService(intent);
    }
}

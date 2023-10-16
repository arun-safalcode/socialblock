package com.socialblocker;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.provider.Browser;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;

import com.socialblocker.shared.SharedPrefUtil;

import java.util.HashMap;
import java.util.List;

public class AccessibilityUtils {
    private static String myRestrictedAddress = null;
    private static String redirectTo = null;

    public static class Builder {
        private String myRestrictedAddress = null;
        private String redirectTo = null;

        public Builder setMyRestrictedAddress(String myRestrictedAddress) {
            this.myRestrictedAddress = filterInputAddress(myRestrictedAddress);
            return this;
        }

        private String filterInputAddress(String edtRestrictedAddress) {
            if (edtRestrictedAddress.startsWith("www.")) {
                return edtRestrictedAddress.split("www.")[1];
            } else {
                return edtRestrictedAddress;
            }
        }

        public Builder setRedirectTo(String redirectTo) {
            this.redirectTo = redirectTo;
            return this;
        }

        public void build() {
            AccessibilityUtils.myRestrictedAddress = myRestrictedAddress;
            AccessibilityUtils.redirectTo = redirectTo;
        }
    }

    private HashMap<String, Long> previousUrlDetections = new HashMap<>();

    private String packageName = "";
    private String foregroundAppName = null;
    private SupportedBrowserConfig browserConfig = null;

    public void filterBrowserURL(AccessibilityEvent event, MyAccessibilityService myAccessibilityService, List<SupportedBrowserConfig> getSupportedBrowsers) {
        try {
            AccessibilityNodeInfo parentNodeInfo = event.getSource();
            if (event.getPackageName() != null) {
                packageName = event.getPackageName().toString();
                PackageManager packageManager = myAccessibilityService.getPackageManager();
                try {
                    packageManager.getPackageInfo(packageName, 0);
                    foregroundAppName = (String) packageManager.getApplicationLabel(packageManager.getApplicationInfo(packageName, 0));
                } catch (PackageManager.NameNotFoundException e) {
                    e.printStackTrace();
                }
            }
            getChild(parentNodeInfo);

            browserConfig = null;
            for (SupportedBrowserConfig supportedConfig : getSupportedBrowsers) {
                if (supportedConfig.getPackageName().equals(packageName)) {
                    browserConfig = supportedConfig;
                }
            }

            if (browserConfig == null) {
                return;
            }

            String capturedUrl = captureUrl(parentNodeInfo, browserConfig);
            parentNodeInfo.recycle();

            if (capturedUrl == null) {
                return;
            }

            Log.e("TAG", "event: " + event);
            Log.e("TAG", "capturedUrl-: " + capturedUrl);
            Log.e("TAG", "eventt: " + event.getContentChangeTypes());
            SharedPrefUtil prefUtil = new SharedPrefUtil(myAccessibilityService);
            List<String> lockedWebsitesList = prefUtil.getLockedWebsitesList();

            for (String website : lockedWebsitesList) {
                if (!website.isEmpty() && capturedUrl.toLowerCase().startsWith(website)) {
                    String replaced = redirectTo;
                    performRedirect(myAccessibilityService, replaced != null ? replaced : "", browserConfig.getPackageName());
                    break; // Exit the loop if a match is found
                }
            }

        } catch (Exception e) {
            // ignored
        }
    }

    private void getChild(AccessibilityNodeInfo info) {
        int childCount = info.getChildCount();
        for (int p = 0; p < childCount; p++) {
            AccessibilityNodeInfo n = info.getChild(p);
            if (n != null) {
                n.getViewIdResourceName();
                if (n.getText() != null) {
                    n.getText().toString();
                }
                getChild(n);
            }
        }
    }

    private String captureUrl(AccessibilityNodeInfo info, SupportedBrowserConfig config) {
        if (config == null) {
            return null;
        }
        List<AccessibilityNodeInfo> nodes = info.findAccessibilityNodeInfosByViewId(config.getAddressBarId());
        if (nodes == null || nodes.size() <= 0) {
            return null;
        }
        AccessibilityNodeInfo addressBarNodeInfo = nodes.get(0);
        String url = null;
        if (addressBarNodeInfo.getText() != null) {
            url = addressBarNodeInfo.getText().toString();
        }
        addressBarNodeInfo.recycle();
        return url;
    }



    private void performRedirect(MyAccessibilityService serviceMy, String redirectUrl, String browserPackage) {
        String url = redirectUrl;
        if (!redirectUrl.startsWith("https://")) {
            url = "https://" + redirectUrl;
        }
        try {
            if (url.equals("")) {
                return;
            }
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            intent.setPackage(browserPackage);
            intent.putExtra(Browser.EXTRA_APPLICATION_ID, browserPackage);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            serviceMy.startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            serviceMy.startActivity(i);
        }
    }
}


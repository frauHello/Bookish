package com.booky;

import android.app.Application;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
///import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import java.util.Arrays;
import java.util.List;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.filepicker.FilePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage; 
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.brentvatne.react.ReactVideoPackage;
//import android.support.multidex.MultiDexApplication;


///the last three statement have been added

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
// the callback variable and it's getter have been added

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerPackage(),
          new FilePickerPackage(),
          new WebViewBridgePackage(),
          new VectorIconsPackage(),
          new RNFetchBlobPackage() ,
          new ReactVideoPackage(),
          new ImagePickerPackage(),
            new RNFirebasePackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseAuthPackage()  ,
            new RNFirebaseMessagingPackage(),
           /// new RNFirebaseNotificationsPackage(),
            new RNFileViewerPackage(),
            new FBSDKPackage(mCallbackManager)
/// the last line have been added for fb configuration

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

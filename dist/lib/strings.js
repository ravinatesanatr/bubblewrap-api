"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enUS = void 0;
exports.enUS = {
    errorAssetLinksGeneration: 'Error generating "assetlinks.json"',
    errorCouldNotfindTwaManifest: (file) => {
        return `Could not load a manifest from: ${(file)}.`;
    },
    errorDirectoryDoesNotExist: (directory) => {
        return `Cannot write to directory: ${directory}.`;
    },
    errorIconUrlMustExist: (manifest) => {
        return `iconUrl field is missing from ${manifest}. Please add an iconUrl to continue.`;
    },
    errorFailedToRunQualityCriteria: ('\nFailed to run the PWA Quality Criteria checks. Skipping.'),
    errorPlayBillingEnableNotifications: (`Play Billing requires ${('enableNotifications')} ` +
        `to be ${('true')}.`),
    errorPlayBillingAlphaDependencies: (`Play Billing requires ${('alphaDependencies')} ` +
        'to be enabled.'),
    errorMaxLength: (maxLength, actualLength) => {
        return `Maximum length is ${maxLength} but input is ${actualLength}.`;
    },
    errorMinLength: (minLength, actualLength) => {
        return `Minimum length is ${minLength} but input is ${actualLength}.`;
    },
    errorMissingArgument: (expected, received) => {
        return `Expected ${(expected.toString())} arguments \
but received ${(received.toString())}. Run ${('bubblewrap help')} for usage.`;
    },
    errorMissingManifestParameter: `Missing requi parameter ${('--manifest')}`,
    errorRequireHttps: 'Url must be https.',
    errorInvalidUrl: (url) => {
        return `Invalid URL: ${url}`;
    },
    errorInvalidColor: (color) => {
        return `Invalid Color ${color}. Try using hexadecimal representation. eg: #FF3300`;
    },
    errorInvalidDisplayMode: (displayMode) => {
        return `Invalid display mode: ${displayMode}`;
    },
    errorInvalidOrientation: (orientation) => {
        return `Invalid orientation: ${orientation}`;
    },
    errorInvalidInteger: (integer) => {
        return `Invalid integer provided: ${integer}`;
    },
    errorInvalidSha256Fingerprint: (fingerprint) => {
        return `Invalid SHA-256 fingerprint ${(fingerprint)}.`;
    },
    errorUrlMustBeImage: (mimeType) => {
        return `URL must resolve to an image/* mime-type, but resolved to ${mimeType}.`;
    },
    errorSdkTerms: 'Downloading Android SDK failed because Terms and Conditions was not signed.',
    messageAddedFingerprint: (fingerprint) => {
        return `Added fingerprint with value ${fingerprint.value}.`;
    },
    messageAndroidAppDetails: (`\nAndroid app details ${('(2/5)')}`),
    messageAndroidAppDetailsDesc: `
Please, enter details regarding how the Android app will look when installed
into a device:

\t- ${('Application name:')} the name used in most places,
\t  including the App information screen and on the Play Store.

\t- ${('Short name:')} an alternate name for the app, limited to
\t  12 characters, used on a device launch screen.

\t- ${('Application ID:')} also known as ${('Package Name')}, this is
\t  the unique identifier for the application on an Android device or
\t  the Play Store. The name must contain at least two segments,
\t  separated by dots, each segment must start with a letter and all
\t  characters must be alphanumeric or an underscore (_).

\t- ${('Display mode:')} how the app will be displayed on the
\t  device screen when started. The default mode, used by most apps,
\t  is ${('standalone')}. ${('fullscreen')} causes the device status bar and
\t  navigation bars to be removed and is suitable for games or media
\t  players. For more information on the status bars and navigation
\t  bar on Android, go to:
\t   - ${('https://material.io/design/platform-guidance/android-bars.html')}.

\t- ${('Status bar color:')} sets the status bar color used when the
\t  application is in foreground. Example: ${('#7CC0FF')}\n`,
    messageApkSuccess: (filename) => {
        return `\t- Generated Android APK at ${(filename)}`;
    },
    messageAppBundleSuccess: (filename) => {
        return `\t- Generated Android App Bundle at ${(filename)}`;
    },
    messageBuildingApp: '\nBuilding the Android App...',
    messageCallBubblewrapBuild: ('\nCall: bubblewrap build\n to rebuild the project and enable uploading.'),
    messageDigitalAssetLinksSuccess: (filename) => {
        return `\t- Generated Digital Asset Links file at ${(filename)}
\nRead more about setting up Digital Asset Links at:
\t` + ('https://developer.chrome.com/docs/android/trusted-web-activity/quick-start/#creating' +
            '-your-asset-link-file');
    },
    messageEnterPasswords: (keypath, keyalias) => {
        return `Please, enter passwords for the keystore ${(keypath)} and alias \
${(keyalias)}.\n`;
    },
    messageGeneratedAssetLinksFile: (outputfile) => {
        return `\nGenerated Digital Asset Links file at ${(outputfile)}.`;
    },
    messageGeneratingAndroidProject: 'Generating Android Project.',
    messageInstallingBuildTools: 'Installing Android Build Tools. Please, read and accept the ' +
        'license agreement.',
    messageInvalidTrack: 'The specified track was not found in the list of available tracks.',
    messageLauncherIconAndSplash: (`\nLauncher icons and splash screen ${('(3/5)')}`),
    messageLauncherIconAndSplashDesc: `
The Android app requires an image for the launcher icon. It also displays a
splash screen while the web content is loading, to avoid displaying a flash of
a blank white page to users. 

\t- ${('Splash screen color:')} sets the background colour used for the
\t  splash screen. Example: ${('#7CC0FF')}

\t- ${('Icon URL:')} URL to an image that is at least 512x512px. Used to
\t  generate the launcher icon for the application and the image for
\t  the splash screen.

\t- ${('Maskable Icon URL (Optional):')} URL to an image that is at least
\t  512x512px to be used when generating maskable icons. Maskable
\t  icons should look good when their edges are removed by an icon
\t  mask. They will be used to display adaptive launcher icons on the
\t  Android home screen.\n`,
    messageInitializingWebManifest: (manifestUrl) => {
        return `Initializing application from Web Manifest:\n\t-  ${(manifestUrl)}`;
    },
    messageLoadingTwaManifestFrom: (path) => {
        return `Loading TWA Manifest from: ${(path)}`;
    },
    messageNoChecksumFileFound: `
No checksum file was found to verify the state of the ${('twa-manifest.json')} file.
To make sure your project is up-to-date, would you like to regenerate your project?
If you are sure your project is updated and you have already run ${('bubblewrap update')}
then you may enter "no"`,
    messageNoChecksumNoUpdate: `
Project build will continue without regenerating project even though no checksum file was found.`,
    messageOptionFeatures: (`\nOptional Features ${('(4/5)')}`),
    messageOptionalFeaturesDesc: `
\t- ${('Include app shortcuts:')} This question is only prompted if a
\t  'shortcuts' section is available on the input Web Manifest. When
\t  answe “yes”, Bubblewrap uses the information to generate
\t  shortcuts on the Android app. Read more about app shortcuts at
\t  ${('https://web.dev/app-shortcuts/')}.

\t- ${('Monochrome icon URL:')} URL to an image that is at least 48x48px to
\t  be used when generating monochrome icons. Monochrome icons should
\t  look good when displayed with a single color, the PWA's
\t  ${('theme_color')}. They will be used for notification icons.\n`,
    messagePlayUploadSuccess: 'Project uploaded to Google Play Store',
    messageProjectGeneratedSuccess: '\nProject generated successfully. Build it by running ' +
        ('bubblewrap build'),
    messageProjectUpdatedSuccess: '\nProject updated successfully.',
    messageProjectBuildReminder: 'Build it by running ' + ('bubblewrap build'),
    messageProjectNotUpdated: '\nProject build will continue without newest ' +
        ('twa-manifest.json') + ' changes.',
    messagePublishingWasNotSuccessful: 'Publishing the project was not successful.',
    messageRemovedFingerprint: (fingerprint) => {
        return `Removed fingerprint with value ${fingerprint.value}.`;
    },
    messageSavingTwaManifestTo: (path) => {
        return `Saving TWA Manifest to: ${(path)}`;
    },
    messageServiceAccountJSONMissing: 'Service account JSON could not be found on disk',
    messageSha256FingerprintNotFound: 'Could not find SHA256 fingerprint. Skipping generating ' +
        '"assetlinks.json"',
    messageSigningKeyCreation: ('\nSigning key creation'),
    messageSigningKeyInformation: (`\nSigning key information ${('(5/5)')}`),
    messageSigningKeyInformationDesc: `
Please, enter information about the key store containing the keys that will be used
to sign the application. If a key store does not exist on the provided path,
Bubblewrap will prompt for the creation of a new keystore.

\t- ${('Key store location:')} The location of the key store in the file
\t  system.

\t- ${('Key name:')} The alias used on the key.

Read more about Android signing keys at:
\t ${('https://developer.android.com/studio/publish/app-signing')}\n`,
    messageSigningKeyNotFound: (path) => {
        return `\nAn existing key store could not be found at "${path}".\n`;
    },
    messageUpgradedAppVersion: (appVersionName, appVersionCode) => {
        return `Upgraded app version to versionName: ${appVersionName} and ` +
            `versionCode: ${appVersionCode}`;
    },
    messageUsingPasswordsFromEnv: 'Using passwords set in the BUBBLEWRAP_KEYSTORE_PASSWORD and ' +
        'BUBBLEWRAP_KEY_PASSWORD environmental variables.',
    messageWebAppDetails: (`\nWeb app details ${('(1/5)')}`),
    messageWebAppDetailsDesc: `
The application generated by Bubblewrap will open a Progressive Web App when
started from the Android launcher. Please enter the following details about
the PWA:
  
\t- ${('Domain:')} the domain / origin where the PWA is hosted. 
\t  Example: ${('example.com')}

\t- ${('URL path:')} an URL path relative to the root of the origin,
\t  opened when the application is started from the home screen.
\t  Examples:

\t\t- To open ${('https://example.com/')}: ${('/')}
\t\t- To open ${('https://example.com/path-to-pwa/')}: ${('/path-to-pwa/')}\n`,
    messageDownloadJdk: 'Downloading JDK 11 to ',
    messageDownloadSdk: 'Downloading Android SDK to ',
    messageDownloadJdkSrc: 'Downloading the JDK 11 Sources...',
    messageDecompressJdkSrc: 'Decompressing the JDK 11 Sources...',
    messageDownloadJdkBin: 'Downloading the JDK 11 Binaries...',
    messageDecompressJdkBin: 'Decompressing the JDK 11 Binaries...',
    messageDownloadAndroidSdk: 'Downloading the Android SDK...',
    messageDecompressAndroidSdk: 'Decompressing the Android SDK...',
    promptCreateDirectory: (directory) => {
        return `Directory ${(directory)} does not exist. Do you want to create it now?`;
    },
    promptExperimentalFeature: 'This is an experimental feature. Are you sure you want to continue?',
    promptInstallJdk: `Do you want Bubblewrap to install the JDK (recommended)?
  (Enter "No" to use your own JDK 11 installation)`,
    promptJdkPath: 'Path to your existing JDK 11:',
    promptInstallSdk: `Do you want Bubblewrap to install the Android SDK (recommended)?
  (Enter "No" to use your own Android SDK installation)`,
    promptSdkTerms: `Do you agree to the Android SDK terms and conditions at ${('https://developer.android.com/studio/terms.html')}?`,
    promptSdkPath: 'Path to your existing Android SDK:',
    promptHostMessage: 'Domain:',
    promptName: 'Application name:',
    promptLauncherName: 'Short name:',
    promptDisplayMode: 'Display mode:',
    promptOrientation: 'Orientation:',
    promptThemeColor: 'Status bar color:',
    promptBackgroundColor: 'Splash screen color:',
    promptStartUrl: 'URL path:',
    promptIconUrl: 'Icon URL:',
    promptMaskableIconUrl: 'Maskable icon URL:',
    promptMonochromeIconUrl: 'Monochrome icon URL:',
    promptShortcuts: 'Include app shortcuts?',
    promptPlayBilling: 'Include support for Play Billing (this relies on alpha dependencies)?',
    promptLocationDelegation: 'Request geolocation permission?',
    promptPackageId: 'Application ID:',
    promptKeyPath: 'Key store location:',
    promptKeyAlias: 'Key name:',
    promptCreateKey: 'Do you want to create one now?',
    promptKeyFullName: 'First and Last names (eg: John Doe):',
    promptKeyOrganizationalUnit: 'Organizational Unit (eg: Engineering Dept):',
    promptKeyOrganization: 'Organization (eg: Company Name):',
    promptKeyCountry: 'Country (2 letter code):',
    promptKeystorePassword: 'Password for the Key Store:',
    promptKeyPassword: 'Password for the Key:',
    promptNewAppVersionName: 'versionName for the new App version:',
    promptVersionCode: 'Starting version code for the new app version:',
    promptVersionMismatch: (currentVersion, playStoreVerison) => {
        return `The current play store version (${(playStoreVerison)}) is higher than your twa
    manifest version (${(currentVersion)}). Do you want to update your TWA Manifest version
    now?`;
    },
    promptUpdateProject: 'There are changes in twa-manifest.json. ' +
        'Would you like to apply them to the project before building?',
    warnFamilyPolicy: (('WARNING: ')) + 'Trusted Web Activities are currently incompatible' +
        ' with applications\ntargeting children under the age of 13.' +
        ' Check out the Play for' +
        ' Families\npolicies to learn more.\n' +
        ('https://play.google.com/console/about/families/'),
    warnIncreasingMinSdkVersion: (('WARNING: ')) + `The minimum Android API Level (${('minSdkVersion')}) has ` +
        `been increased\nfrom ${('19')} to ${('23')} because the ${('--metaquest')} ` +
        'flag is used.',
    warnPwaFailedQuality: ('PWA Quality Criteria check failed.'),
    updateConfigUsage: 'Usage: [--jdkPath <path-to-jdk>] [--androidSdkPath <path-to-android-sdk>]' +
        '(You can insert one or both of them)',
    jdkPathIsNotCorrect: 'The jdkPath isn\'t correct, please run the following command to update ' +
        'it:\nbubblewrap updateConfig --jdkPath <path-to-jdk>, such that the folder of the path' +
        'contains the file "release". Then run bubblewrap doctor again.',
    jdkIsNotSupported: 'Unsupported jdk version. Please download "OpenJDK 11(LTS)" at the link ' +
        'below:\nhttps://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=hotspot.',
    androidSdkPathIsNotCorrect: 'The androidSdkPath isn\'t correct, please run the following ' +
        'command to update it:\nbubblewrap updateConfig --androidSdkPath <path-to-sdk>, such that ' +
        'the folder of the path contains the folder "build". Then run bubblewrap doctor again.',
    bothPathsAreValid: 'Your jdkpath and androidSdkPath are valid.',
    versionDoesNotExistOnServer: 'The supplied version code does not exist on the Google Play' +
        ' Servers.',
    versionToRetainHigherThanBuildVersion: (currentVersion, versionToRetain) => {
        return `The version to retain (${(versionToRetain.toString())}) is currently higher than
      the current version you want to publish (${(currentVersion.toString())}).`;
    },
    versionRetainedNotAnInteger: 'The retained version code must be an integer.',
};

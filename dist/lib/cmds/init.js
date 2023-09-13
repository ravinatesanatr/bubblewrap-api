"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs = require("fs");
const path_1 = require("path");
const core_1 = require("@bubblewrap/core");
const constants_1 = require("../constants");
const Prompt_1 = require("../Prompt");
const strings_1 = require("../strings");
const shared_1 = require("./shared");
async function confirmTwaConfig(twaManifest, prompt) {
    // Warn about the Google Play Family Policy
    prompt.printMessage(strings_1.enUS.warnFamilyPolicy);
    // Step 1/5 - Collect information on the Web App.
    prompt.printMessage(strings_1.enUS.messageWebAppDetails);
    prompt.printMessage(strings_1.enUS.messageWebAppDetailsDesc);
    // twaManifest.host = await prompt.promptInput(
    //     messages.promptHostMessage, twaManifest.host, validateHost);
    // twaManifest.startUrl = await prompt.promptInput(
    //     messages.promptStartUrl, twaManifest.startUrl, createValidateString(1));
    // Step 2/5 Collect information on the Android App.
    prompt.printMessage(strings_1.enUS.messageAndroidAppDetails);
    prompt.printMessage(strings_1.enUS.messageAndroidAppDetailsDesc);
    // twaManifest.name = await prompt.promptInput(
    //     messages.promptName,
    //     twaManifest.name,
    //     createValidateString(1, 50),
    // );
    // twaManifest.launcherName = await prompt.promptInput(
    //     messages.promptLauncherName,
    //     twaManifest.launcherName,
    //     createValidateString(1, 12),
    // );
    // twaManifest.packageId = await prompt.promptInput(
    //     messages.promptPackageId,
    //     twaManifest.packageId,
    //     validatePackageId,
    // );
    // twaManifest.appVersionCode = await prompt.promptInput(
    //     messages.promptVersionCode,
    //     twaManifest.appVersionCode.toString(),
    //     validateInteger,
    // );
    // twaManifest.appVersionName = twaManifest.appVersionCode.toString();
    // twaManifest.display = await prompt.promptChoice(
    //     messages.promptDisplayMode,
    //     DisplayModes,
    //     twaManifest.display,
    //     validateDisplayMode,
    // );
    //
    // twaManifest.orientation = await prompt.promptChoice(
    //     messages.promptOrientation,
    //     Orientations,
    //     twaManifest.orientation,
    //     validateOrientation,
    // );
    //
    // twaManifest.themeColor = await prompt.promptInput(
    //     messages.promptThemeColor,
    //     twaManifest.themeColor.hex(),
    //     validateColor,
    // );
    // Step 3/5 Launcher Icons and Splash Screen.
    prompt.printMessage(strings_1.enUS.messageLauncherIconAndSplash);
    prompt.printMessage(strings_1.enUS.messageLauncherIconAndSplashDesc);
    // twaManifest.backgroundColor = await prompt.promptInput(
    //     messages.promptBackgroundColor,
    //     twaManifest.backgroundColor.hex(),
    //     validateColor,
    // );
    //
    // twaManifest.iconUrl = (await prompt.promptInput(
    //     messages.promptIconUrl,
    //     twaManifest.iconUrl ? twaManifest.iconUrl : '',
    //     validateImageUrl,
    // )).toString();
    //
    // const maskableIconUrl = await prompt.promptInput(
    //     messages.promptMaskableIconUrl,
    //     twaManifest.maskableIconUrl ? twaManifest.maskableIconUrl : '',
    //     validateOptionalImageUrl,
    // );
    // twaManifest.maskableIconUrl = maskableIconUrl ? maskableIconUrl.toString() : undefined;
    // Step 4/5 Optional Features.
    prompt.printMessage(strings_1.enUS.messageOptionFeatures);
    prompt.printMessage(strings_1.enUS.messageOptionalFeaturesDesc);
    // if (twaManifest.shortcuts.length > 0) {
    //   const addShortcuts = await prompt.promptConfirm(messages.promptShortcuts, true);
    //   if (!addShortcuts) {
    //     twaManifest.shortcuts = [];
    //   }
    // }
    // const monochromeIconUrl = await prompt.promptInput(
    //     messages.promptMonochromeIconUrl,
    //     twaManifest.monochromeIconUrl ? twaManifest.monochromeIconUrl : '',
    //     validateOptionalImageUrl,
    // );
    twaManifest.monochromeIconUrl = twaManifest.monochromeIconUrl ? twaManifest.monochromeIconUrl.toString() : undefined;
    // const playBillingEnabled = await prompt.promptConfirm(messages.promptPlayBilling, false);
    // if (playBillingEnabled) {
    // twaManifest.alphaDependencies = {
    //     enabled: true,
    //   };
    //
    //   twaManifest.features = {
    //     ...twaManifest.features,
    //     playBilling: {
    //       enabled: true,
    //     },
    //   };
    // }
    twaManifest.alphaDependencies = {
        enabled: true,
    };
    twaManifest.features = {
        ...twaManifest.features,
        playBilling: {
            enabled: true,
        },
    };
    twaManifest.features = {
        ...twaManifest.features,
        locationDelegation: {
            enabled: true,
        },
    };
    // const locationDelegationEnabled =
    //     await prompt.promptConfirm(messages.promptLocationDelegation, false);
    // if (locationDelegationEnabled) {
    //   twaManifest.features = {
    //     ...twaManifest.features,
    //     locationDelegation: {
    //       enabled: true,
    //     },
    //   };
    // }
    // Step 5/5 Signing Key Information.
    prompt.printMessage(strings_1.enUS.messageSigningKeyInformation);
    prompt.printMessage(strings_1.enUS.messageSigningKeyInformationDesc);
    // twaManifest.signingKey.path = await prompt.promptInput(
    //     messages.promptKeyPath,
    //     twaManifest.signingKey.path,
    //     createValidateString(6),
    // );
    //
    // twaManifest.signingKey.alias = await prompt.promptInput(
    //     messages.promptKeyAlias,
    //     twaManifest.signingKey.alias,
    //     createValidateString(1),
    // );
    twaManifest.generatorApp = constants_1.APP_NAME;
    return twaManifest;
}
async function createSigningKey(twaManifest, config, prompt, certInfo) {
    // Signing Key already exists. Skip creation.
    if (fs.existsSync(twaManifest.signingKey.path)) {
        return;
    }
    const jdkHelper = new core_1.JdkHelper(process, config);
    const keytool = new core_1.KeyTool(jdkHelper);
    prompt.printMessage(strings_1.enUS.messageSigningKeyCreation);
    prompt.printMessage(strings_1.enUS.messageSigningKeyNotFound(twaManifest.signingKey.path));
    // Ask user if they want to create a signing key now.
    // if (!await prompt.promptConfirm(messages.promptCreateKey, true)) {
    //   return;
    // }
    const fullName = certInfo.fullName;
    // await prompt.promptInput(messages.promptKeyFullName, null, createValidateString(1));
    const organizationalUnit = certInfo.organizationalUnit;
    // await prompt.promptInput(
    // messages.promptKeyOrganizationalUnit, null, createValidateString(1));
    const organization = certInfo.organization;
    // await prompt.promptInput(messages.promptKeyOrganization, null, createValidateString(1));
    const country = certInfo.country;
    // await prompt.promptInput(messages.promptKeyCountry, null, createValidateString(2, 2));
    const keystorePassword = certInfo.keystorePassword;
    // await prompt.promptPassword(messages.promptKeystorePassword, createValidateString(6));
    const keyPassword = certInfo.keyPassword;
    // await prompt.promptPassword(messages.promptKeyPassword, createValidateString(6));
    await keytool.createSigningKey({
        fullName: fullName,
        organizationalUnit: organizationalUnit,
        organization: organization,
        country: country,
        password: keystorePassword,
        keypassword: keyPassword,
        alias: twaManifest.signingKey.alias,
        path: twaManifest.signingKey.path,
    });
}
async function init(args, config, prompt = new Prompt_1.InquirerPrompt()) {
    if (!args.manifest) {
        prompt.printMessage(strings_1.enUS.errorMissingManifestParameter);
        return false;
    }
    prompt.printMessage(strings_1.enUS.messageInitializingWebManifest(args.manifest));
    // Ensure `targetDirectory` exists.
    const targetDirectory = (0, path_1.resolve)(process.cwd(), args.directory || './');
    if (!fs.existsSync(targetDirectory)) {
        // Confirm if the directory should be created. Otherwise, thrown an error.
        fs.promises.mkdir(targetDirectory, { recursive: true });
    }
    let twaManifest = await core_1.TwaManifest.fromWebManifest(args.manifest);
    if (args.chromeosonly) {
        twaManifest.isChromeOSOnly = true;
    }
    if (args.metaquest) {
        twaManifest.isMetaQuest = true;
        twaManifest.minSdkVersion = 23;
        // Warn about increasing the minimum Android API Level
        prompt.printMessage(strings_1.enUS.warnIncreasingMinSdkVersion);
    }
    if (args.alphaDependencies) {
        twaManifest.alphaDependencies = {
            enabled: true,
        };
    }
    // The default path is "./android-keystore". Make sure it's relative to "targetDirectory".
    twaManifest.signingKey.path = (0, path_1.join)(targetDirectory, twaManifest.signingKey.path);
    twaManifest = await confirmTwaConfig(twaManifest, prompt);
    const twaGenerator = new core_1.TwaGenerator();
    await twaManifest.saveToFile((0, path_1.join)(targetDirectory, '/twa-manifest.json'));
    await (0, shared_1.generateTwaProject)(prompt, twaGenerator, targetDirectory, twaManifest);
    await (0, shared_1.generateManifestChecksumFile)((0, path_1.join)(targetDirectory, '/twa-manifest.json'), targetDirectory);
    await createSigningKey(twaManifest, config, prompt, args.certInfo);
    prompt.printMessage(strings_1.enUS.messageProjectGeneratedSuccess);
    return true;
}
exports.init = init;

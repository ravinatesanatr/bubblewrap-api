"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.generateManifestChecksumFile = exports.computeChecksum = exports.updateVersions = exports.generateTwaProject = void 0;
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Prompt_1 = require("../Prompt");
const strings_1 = require("../strings");
const constants_1 = require("../constants");
const core_1 = require("@bubblewrap/core");
const core_2 = require("@bubblewrap/core");
const inputHelpers_1 = require("../inputHelpers");
/**
 * Wraps generating a project with a progress bar.
 */
async function generateTwaProject(prompt, twaGenerator, targetDirectory, twaManifest) {
    // prompt.printMessage(messages.messageGeneratingAndroidProject);
    // const progressBar = new Bar({
    //   format: ` >> [${green('{bar}')}] {percentage}%`,
    // }, Presets.shades_classic);
    // progressBar.start(100, 0);
    // const progress = (current: number, total: number): void => {
    //   progressBar.update(current / total * 100);
    // };
    const log = new core_1.BufferedLog(new core_1.ConsoleLog('Generating TWA'));
    await twaGenerator.createTwaProject(targetDirectory, twaManifest, log, undefined);
    // progressBar.stop();
    log.flush();
}
exports.generateTwaProject = generateTwaProject;
/**
 * Compute the new app version.
 * @param {TwaManifest} oldTwaManifest current Twa Manifest.
 * @param {string | null} currentAppVersionName the current app's version name (or null) .
 * @param {Prompt} prompt prompt instance to get information from the user if needed.
 */
async function updateVersions(twaManifest, currentAppVersionName, prompt = new Prompt_1.InquirerPrompt()) {
    const previousAppVersionCode = twaManifest.appVersionCode;
    const appVersionCode = twaManifest.appVersionCode + 1;
    // If a version was passed as parameter, use it.
    if (currentAppVersionName) {
        return {
            appVersionCode: appVersionCode,
            appVersionName: currentAppVersionName,
        };
    }
    // Otherwise, try to upgrade automatically with the versionCode.
    if (twaManifest.appVersionName === previousAppVersionCode.toString()) {
        return {
            appVersionCode: appVersionCode,
            appVersionName: appVersionCode.toString(),
        };
    }
    // If not not possible, ask the user to input a new version.
    const appVersionName = await prompt.promptInput(strings_1.enUS.promptNewAppVersionName, null, (0, inputHelpers_1.createValidateString)(1));
    return {
        appVersionCode: appVersionCode,
        appVersionName: appVersionName,
    };
}
exports.updateVersions = updateVersions;
function computeChecksum(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}
exports.computeChecksum = computeChecksum;
async function generateManifestChecksumFile(manifestFile, targetDirectory) {
    const manifestContents = await fs.promises.readFile(manifestFile);
    const checksumFile = path.join(targetDirectory, 'manifest-checksum.txt');
    const sum = computeChecksum(manifestContents);
    await fs.promises.writeFile(checksumFile, sum);
}
exports.generateManifestChecksumFile = generateManifestChecksumFile;
/**
 * Update the TWA project.
 * @param skipVersionUpgrade {boolean} Skips upgrading appVersionCode and appVersionName if set to true.
 * @param appVersionName {string | null} Value to be used for appVersionName when upgrading
 * versions. Ignored if `args.skipVersionUpgrade` is set to true. If null, a default is used or user will be prompted for one.
 * @param prompt {Prompt} Prompt instance to get information from the user if necessary.
 * @param directory {string} TWA project directory.
 * @param manifest {string} Path to twa-manifest.json file.
 */
async function updateProject(skipVersionUpgrade, appVersionName, prompt = new Prompt_1.InquirerPrompt(), directory, manifest) {
    var _a, _b;
    const targetDirectory = directory || process.cwd();
    const manifestFile = manifest || path.join(process.cwd(), 'twa-manifest.json');
    const twaManifest = await core_2.TwaManifest.fromFile(manifestFile);
    twaManifest.generatorApp = constants_1.APP_NAME;
    const features = twaManifest.features;
    // Check that if Play Billing is enabled, enableNotifications must also be true.
    if (((_a = features.playBilling) === null || _a === void 0 ? void 0 : _a.enabled) && !twaManifest.enableNotifications) {
        prompt.printMessage(strings_1.enUS.errorPlayBillingEnableNotifications);
        return false;
    }
    // Check that if Play Billing is enabled, alphaDependencies must also be enabled.
    if (((_b = features.playBilling) === null || _b === void 0 ? void 0 : _b.enabled) && !twaManifest.alphaDependencies.enabled) {
        prompt.printMessage(strings_1.enUS.errorPlayBillingAlphaDependencies);
        return false;
    }
    // Check that the iconUrl exists.
    if (!twaManifest.iconUrl) {
        throw new Error(strings_1.enUS.errorIconUrlMustExist(manifestFile));
    }
    // Check that the iconUrl is valid.
    if (twaManifest.iconUrl) {
        const result = await (0, inputHelpers_1.validateImageUrl)(twaManifest.iconUrl);
        if (result.isError()) {
            throw result.unwrapError();
        }
    }
    if (!skipVersionUpgrade) {
        const newVersionInfo = await updateVersions(twaManifest, appVersionName, prompt);
        twaManifest.appVersionName = newVersionInfo.appVersionName;
        twaManifest.appVersionCode = newVersionInfo.appVersionCode;
        prompt.printMessage(strings_1.enUS.messageUpgradedAppVersion(newVersionInfo.appVersionName, newVersionInfo.appVersionCode));
    }
    const twaGenerator = new core_2.TwaGenerator();
    await twaGenerator.removeTwaProject(targetDirectory);
    await generateTwaProject(prompt, twaGenerator, targetDirectory, twaManifest);
    if (!skipVersionUpgrade) {
        await twaManifest.saveToFile(manifestFile);
    }
    await generateManifestChecksumFile(manifestFile, targetDirectory);
    prompt.printMessage(strings_1.enUS.messageProjectUpdatedSuccess);
    return true;
}
exports.updateProject = updateProject;

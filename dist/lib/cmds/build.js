"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const core_1 = require("@bubblewrap/core");
const fs = require("fs");
const path = require("path");
const strings_1 = require("../strings");
const Prompt_1 = require("../Prompt");
const inputHelpers_1 = require("../inputHelpers");
const shared_1 = require("./shared");
const constants_1 = require("../constants");
// Path to the file generated when building an app bundle file using gradle.
const APP_BUNDLE_BUILD_OUTPUT_FILE_NAME = './app/build/outputs/bundle/release/app-release.aab';
const APP_BUNDLE_SIGNED_FILE_NAME = './app-release-bundle.aab'; // Final signed App Bundle file.
// Path to the file generated when building an APK file using gradle.
const APK_BUILD_OUTPUT_FILE_NAME = './app/build/outputs/apk/release/app-release-unsigned.apk';
// Final aligned and signed APK.
const APK_SIGNED_FILE_NAME = './app-release-signed.apk';
// Output file for zipalign.
const APK_ALIGNED_FILE_NAME = './app-release-unsigned-aligned.apk';
class Build {
    constructor(args, androidSdkTools, keyTool, gradleWrapper, jarSigner, log = new core_1.ConsoleLog('build'), prompt = new Prompt_1.InquirerPrompt()) {
        this.args = args;
        this.androidSdkTools = androidSdkTools;
        this.keyTool = keyTool;
        this.gradleWrapper = gradleWrapper;
        this.jarSigner = jarSigner;
        this.log = log;
        this.prompt = prompt;
    }
    /**
     * Checks if the twa-manifest.json file has been changed since the last time the project was generated.
     */
    async hasManifestChanged(manifestFile) {
        const targetDirectory = this.args.directory || process.cwd();
        const checksumFile = path.join(targetDirectory, 'manifest-checksum.txt');
        const prevChecksum = (await fs.promises.readFile(checksumFile)).toString();
        const manifestContents = await fs.promises.readFile(manifestFile);
        const currChecksum = (0, shared_1.computeChecksum)(manifestContents);
        return currChecksum != prevChecksum;
    }
    /**
     * Checks if the keystore password and the key password are part of the environment prompts the
     * user for a password otherwise.
     *
     * @returns {Promise<SigningKeyPasswords} the password information collected from enviromental
     * variables or user input.
     */
    async getPasswords(signingKeyInfo) {
        // Check if passwords are set as environment variables.
        const envKeystorePass = process.env['BUBBLEWRAP_KEYSTORE_PASSWORD'];
        const envKeyPass = process.env['BUBBLEWRAP_KEY_PASSWORD'];
        if (envKeyPass !== undefined && envKeystorePass !== undefined) {
            this.prompt.printMessage(strings_1.enUS.messageUsingPasswordsFromEnv);
            return {
                keystorePassword: envKeystorePass,
                keyPassword: envKeyPass,
            };
        }
        // Ask user for the keystore password
        this.prompt.printMessage(strings_1.enUS.messageEnterPasswords(signingKeyInfo.path, signingKeyInfo.alias));
        const keystorePassword = await this.prompt.promptPassword(strings_1.enUS.promptKeystorePassword, (0, inputHelpers_1.createValidateString)(6));
        const keyPassword = await this.prompt.promptPassword(strings_1.enUS.promptKeyPassword, (0, inputHelpers_1.createValidateString)(6));
        return {
            keystorePassword: keystorePassword,
            keyPassword: keyPassword,
        };
    }
    async buildApk() {
        await this.gradleWrapper.assembleRelease();
        await this.androidSdkTools.zipalignOnlyVerification(APK_BUILD_OUTPUT_FILE_NAME);
        fs.copyFileSync(APK_BUILD_OUTPUT_FILE_NAME, APK_ALIGNED_FILE_NAME);
    }
    async signApk(signingKey, passwords) {
        await this.androidSdkTools.apksigner(signingKey.path, passwords.keystorePassword, signingKey.alias, passwords.keyPassword, APK_ALIGNED_FILE_NAME, // input file path
        APK_SIGNED_FILE_NAME);
    }
    async buildAppBundle() {
        await this.gradleWrapper.bundleRelease();
    }
    async signAppBundle(signingKey, passwords) {
        await this.jarSigner.sign(signingKey, passwords.keystorePassword, passwords.keyPassword, APP_BUNDLE_BUILD_OUTPUT_FILE_NAME, APP_BUNDLE_SIGNED_FILE_NAME);
    }
    /**
     * Based on the promptResponse to update the project or not, run an update or print the relevant warning message.
     *
     * @returns {Promise<boolean>} whether the appropriate action taken (update project or print warning) was successful
     */
    async runUpdate(promptResponse, manifestFile, noUpdateMessage) {
        if (!promptResponse) {
            this.prompt.printMessage(noUpdateMessage);
            return true;
        }
        return await (0, shared_1.updateProject)(false, null, this.prompt, this.args.directory, manifestFile);
    }
    async build() {
        if (!await this.androidSdkTools.checkBuildTools()) {
            this.prompt.printMessage(strings_1.enUS.messageInstallingBuildTools);
            await this.androidSdkTools.installBuildTools();
        }
        const manifestFile = this.args.manifest || path.join(process.cwd(), constants_1.TWA_MANIFEST_FILE_NAME);
        const twaManifest = await core_1.TwaManifest.fromFile(manifestFile);
        const targetDirectory = this.args.directory || process.cwd();
        const checksumFile = path.join(targetDirectory, 'manifest-checksum.txt');
        let updateSuccessful = true;
        if (!fs.existsSync(checksumFile)) {
            // If checksum file doesn't exist, prompt the user about updating their project
            const applyChanges = await this.prompt.promptConfirm(strings_1.enUS.messageNoChecksumFileFound, true);
            updateSuccessful = await this.runUpdate(applyChanges, manifestFile, strings_1.enUS.messageNoChecksumNoUpdate);
        }
        else {
            const hasManifestChanged = await this.hasManifestChanged(manifestFile);
            if (hasManifestChanged) {
                // const applyChanges = await this.prompt.promptConfirm(messages.promptUpdateProject, true);
                updateSuccessful = await this.runUpdate(true, manifestFile, strings_1.enUS.messageProjectNotUpdated);
            }
        }
        if (!updateSuccessful) {
            return false;
        }
        let passwords = null;
        let signingKey = twaManifest.signingKey;
        if (!this.args.skipSigning) {
            passwords = await this.getPasswords(signingKey);
            signingKey = {
                ...signingKey,
                ...(this.args.signingKeyPath ? { path: this.args.signingKeyPath } : null),
                ...(this.args.signingKeyAlias ? { alias: this.args.signingKeyAlias } : null),
            };
        }
        // Builds the Android Studio Project
        this.prompt.printMessage(strings_1.enUS.messageBuildingApp);
        await this.buildApk();
        if (passwords) {
            await this.signApk(signingKey, passwords);
        }
        const apkFileName = this.args.skipSigning ?
            APK_ALIGNED_FILE_NAME :
            APK_SIGNED_FILE_NAME;
        this.prompt.printMessage(strings_1.enUS.messageApkSuccess(apkFileName));
        await this.buildAppBundle();
        if (passwords) {
            await this.signAppBundle(signingKey, passwords);
        }
        const appBundleFileName = this.args.skipSigning ?
            APP_BUNDLE_BUILD_OUTPUT_FILE_NAME :
            APP_BUNDLE_SIGNED_FILE_NAME;
        this.prompt.printMessage(strings_1.enUS.messageAppBundleSuccess(appBundleFileName));
        return true;
    }
}
async function build(config, args, log = new core_1.ConsoleLog('build'), prompt = new Prompt_1.InquirerPrompt()) {
    const jdkHelper = new core_1.JdkHelper(process, config);
    const androidSdkTools = await core_1.AndroidSdkTools.create(process, config, jdkHelper, log);
    const keyTool = new core_1.KeyTool(jdkHelper, log);
    const gradleWrapper = new core_1.GradleWrapper(process, androidSdkTools);
    const jarSigner = new core_1.JarSigner(jdkHelper);
    const build = new Build(args, androidSdkTools, keyTool, gradleWrapper, jarSigner, log, prompt);
    return build.build();
}
exports.build = build;

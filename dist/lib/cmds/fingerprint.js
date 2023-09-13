"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprint = void 0;
const core_1 = require("@bubblewrap/core");
const constants_1 = require("../constants");
const Prompt_1 = require("../Prompt");
const path = require("path");
const fs = require("fs");
const strings_1 = require("../strings");
const inputHelpers_1 = require("../inputHelpers");
async function loadManifest(args, prompt) {
    const manifestFile = args.manifest || path.join(process.cwd(), constants_1.TWA_MANIFEST_FILE_NAME);
    prompt.printMessage(strings_1.enUS.messageLoadingTwaManifestFrom(manifestFile));
    if (!fs.existsSync(manifestFile)) {
        throw new Error(strings_1.enUS.errorCouldNotfindTwaManifest(manifestFile));
    }
    return await core_1.TwaManifest.fromFile(manifestFile);
}
async function saveManifest(args, twaManifest, prompt) {
    const manifestFile = args.manifest || path.join(process.cwd(), constants_1.TWA_MANIFEST_FILE_NAME);
    prompt.printMessage(strings_1.enUS.messageSavingTwaManifestTo(manifestFile));
    await twaManifest.saveToFile(manifestFile);
}
async function generateAssetLinks(args, prompt, twaManifest) {
    twaManifest = twaManifest || await loadManifest(args, prompt);
    const fingerprints = twaManifest.fingerprints.map((value) => value.value);
    const digitalAssetLinks = core_1.DigitalAssetLinks.generateAssetLinks(twaManifest.packageId, ...fingerprints);
    const digitalAssetLinksFile = args.output || path.join(process.cwd(), constants_1.ASSETLINKS_OUTPUT_FILE);
    await fs.promises.writeFile(digitalAssetLinksFile, digitalAssetLinks);
    prompt.printMessage(strings_1.enUS.messageGeneratedAssetLinksFile(digitalAssetLinksFile));
    return true;
}
async function addFingerprint(args, prompt) {
    if (args._.length < 3) {
        throw new Error(strings_1.enUS.errorMissingArgument(3, args._.length));
    }
    const fingerprintValue = (await (0, inputHelpers_1.validateSha256Fingerprint)(args._[2])).unwrap();
    const twaManifest = await loadManifest(args, prompt);
    const fingerprint = { name: args.name, value: fingerprintValue };
    twaManifest.fingerprints.push(fingerprint);
    prompt.printMessage(strings_1.enUS.messageAddedFingerprint(fingerprint));
    await saveManifest(args, twaManifest, prompt);
    return await generateAssetLinks(args, prompt, twaManifest);
}
async function removeFingerprint(args, prompt) {
    if (args._.length < 3) {
        throw new Error(strings_1.enUS.errorMissingArgument(3, args._.length));
    }
    const fingerprint = args._[2];
    const twaManifest = await loadManifest(args, prompt);
    twaManifest.fingerprints =
        twaManifest.fingerprints.filter((value) => {
            if (value.value === fingerprint) {
                prompt.printMessage(strings_1.enUS.messageRemovedFingerprint(value));
                return false;
            }
            return true;
        });
    await saveManifest(args, twaManifest, prompt);
    return await generateAssetLinks(args, prompt, twaManifest);
}
async function listFingerprints(args, prompt) {
    const twaManifest = await loadManifest(args, prompt);
    twaManifest.fingerprints.forEach((fingerprint) => {
        console.log(`\t${fingerprint.name || '<unnamed>'}: ${fingerprint.value}`);
    });
    return true;
}
async function fingerprint(args, prompt = new Prompt_1.InquirerPrompt()) {
    if (args._.length < 2) {
        throw new Error(strings_1.enUS.errorMissingArgument(2, args._.length));
    }
    const subcommand = args._[1];
    switch (subcommand) {
        case 'add':
            return await addFingerprint(args, prompt);
        case 'remove':
            return await removeFingerprint(args, prompt);
        case 'list':
            return await listFingerprints(args, prompt);
        case 'generateAssetLinks':
            return await generateAssetLinks(args, prompt);
        default:
            throw new Error(`Unknown subcommand: ${subcommand}`);
    }
}
exports.fingerprint = fingerprint;

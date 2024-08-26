# @onslip/automation

## 1.2.0

### Minor Changes

- 88f9c39: Support Shadow DOM-piercing. All nested XPath expressions should be relative.
- 2e28f23: Added textContent, isChecked, isDisabled, isEnabled, isEditable, isHidden, isVisible to Locator.
- 0e3d02e: Added a timeout parameter to Device.findDevice().
- aed87d3: Allow arguments to be passed to started app.
- 2da2b00: Added assertions/custom matchers for @playwright/test.
- 883546e: Added resolveWebViewContext convenience function.

### Patch Changes

- 57286e5: Pass device ID to adb/ideviceinstaller when installing/uninstalling apps.
- 19f723e: Default page timeout should be 0 (disabled), like in Playwright.

## 1.1.0

### Minor Changes

- 4cca30e: Bumped deps.

### Patch Changes

- 65463c2: @types/chrome-remote-interface should be a regular dependency.
- 2e0f02f: Don't leak on-exit handlers.

## 1.0.1

### Patch Changes

- 7be0f9a: Ensure spawned processes (like idevicesyslog) are killed on exit.
- 1fbabf1: iOS 9 (ES5) fixes.

## 1.0.0

### Major Changes

- 16a19ed: Removed 'protocol' option since it's not used anyway.
- b6606b0: Device management is now unified into a single API supporting both Android and iOS.

## 0.4.0

### Minor Changes

- b4b6364: Added 'historic' logcat option, a better alternative to 'clear'.
- 723f903: Added basic iOS support via ios_webkit_debug_proxy
- b938d1d: Added fill() to input text.

## 0.3.0

### Minor Changes

- 8cc5366: Added stopAndroidApplication and executeAndroidShellCommand helpers.

### Patch Changes

- 9ff4353: Wait for DOM before initialization is complete.
- b653813: Prettier debug output.
- c93c858: Bumped deps.

## 0.2.0

### Minor Changes

- bc3a9f2: Added Page.evaluate.
- 6ba828f: Support shorthand text selectors.
- f878fab: Added startAndroidActivity to lauch activities.
- 8b6fce0: Added scrollIntoViewIfNeeded.
- 8d24a46: Added evaluate and evaluateAll.
- f150d66: Added partial Page.mouse.
- 66003f5: Added RegExp text selectors.
- 4dd5293: Added has/hasText locator options.

### Patch Changes

- 755be74: Cannot fetch props from unconnected nodes.
- dd95272: Fixed isTarget calculation.

## 0.1.0

### Minor Changes

- 25301f4: Initial release.

TESTAPPS := tests/testapp/dist/index.html \
	    tests/testapp/android/app/build/outputs/apk/debug/app-debug.apk \
	    tests/testapp/ios/App/DerivedData/App/Build/Products/Debug-iphonesimulator/App.app

help:										## Show all public targets (this command).
	@awk -F ':.*## ' '/^[^\t]+:.*## / { printf "\033[1m%-16s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

all:		build docs							## Build all artifacts.

prepare:									## Build and install all dependencies.
	pnpm install --frozen-lockfile
	pnpm -C tests/testapp install --frozen-lockfile

build:		prepare								## Build package.
	pnpm exec tsc --build

testapps:	prepare								## Build test apps.
	$(MAKE) $(TESTAPPS)

$(TESTAPPS):
	pnpm -C tests/testapp build
	pnpm -C tests/testapp exec cap sync
	cd tests/testapp/android && ./gradlew assembleDebug
	cd tests/testapp/ios/App && xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug -sdk iphonesimulator -derivedDataPath DerivedData/App

docs:		prepare								## Build API documentation.
	rm -rf docs
	pnpm exec typedoc --entryPoints src --entryPoints src/test.ts --excludePrivate --excludeProtected --readme none --plugin typedoc-plugin-markdown

test:		build testapps	 						## Run Playwright tests.
	pnpm exec playwright test --config tests

clean:										## Clean all build artifacts (but not dependencies).
	rm -rf build test-results
	rm -rf tests/testapp/dist
	rm -rf tests/testapp/android/{capacitor-cordova-android-plugins,app/{build,src/main/{assets/{capacitor.{config,plugins}.json,public},res/xml/config.xml}}}
	rm -rf tests/testapp/ios/{capacitor-cordova-ios-plugins,App/{build,DerivedData,Pods,App/{capacitor.config.json,config.xml,public}}}

distclean:	clean								## Like clean, but also remove all dependencies.
	rm -rf node_modules tests/testapp/node_modules tests/testapp/android/.gradle

commit:		prepare								## Commit a change and create a change-log entry for it.
	pnpm exec changeset

release:	pristine prepare						## Bump all package versions and generate changelog.
	$(MAKE) docs && git add -A docs
	pnpm exec changeset version
	pnpm install
	git commit --amend --reuse-message=HEAD pnpm-lock.yaml

publish:	pristine clean build						## Publish all new packages to NPM.
	pnpm publish --access public
	GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=tag.gpgSign GIT_CONFIG_VALUE_0=true pnpm exec changeset tag

pristine:
	@[[ -z "$$(git status --porcelain)" ]] || (git status; false)

.PHONY:		help all prepare build testapps docs test clean distclean commit release publish pristine

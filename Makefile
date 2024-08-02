help:										## Show all public targets (this command).
	@awk -F ':.*## ' '/^[^\t]+:.*## / { printf "\033[1m%-16s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

all:		build docs							## Build all artifacts.

prepare:									## Build and install all dependencies.
	pnpm install --frozen-lockfile

build:		prepare								## Build module.
	pnpm exec tsc --build

docs:		prepare								## Build API documentation
	rm -rf docs
	pnpm exec typedoc --entryPoints src/index.ts --excludePrivate --excludeProtected --readme none --plugin typedoc-plugin-markdown

clean:										## Clean all build artifacts (but not dependencies).
	rm -rf build

distclean:	clean								## Like clean, but also remove all dependencies.
	rm -rf node_modules

commit:		prepare								## Commit a change and create a change-log entry for it.
	pnpm exec changeset

release:	pristine prepare						## Bump all package versions and generate changelog.
	pnpm exec changeset version
	pnpm install
	git commit --amend --reuse-message=HEAD pnpm-lock.yaml

publish:	pristine clean build						## Publish all new packages to NPM.
	pnpm publish --access public
	GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=tag.gpgSign GIT_CONFIG_VALUE_0=true pnpm exec changeset tag

pristine:
	@[[ -z "$$(git status --porcelain)" ]] || (git status; false)

.PHONY:		help all prepare build clean distclean commit release publish pristine

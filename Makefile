version = $(shell cat package.json | grep version | awk -F'"' '{print $$4}')

build:
	jekyll build

deploy: build
	find public -type f -exec curl --ftp-create-dirs -T {} -u crhdemo:crhdemo ftp://192.168.1.211/cf-sbc-background/{} \;

publish: build
	cd public; \
	git add --all .; \
	git commit -m 'Updating to $(version)'; \
	git tag $(version); \
	git push --quiet origin dist; \
	git push --quiet origin --tags

.PHONY: build deploy publish

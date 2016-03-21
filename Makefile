version = $(shell cat package.json | grep version | awk -F'"' '{print $$4}')

build:
	jekyll build

deploy: build
	rsync -avze 'ssh -p 22' --delete --filter='P .git' public/ root@192.168.1.215:/usr/local/app/apache/htdocs/standard-back

publish: build
	cd public; \
	git add --all .; \
	git commit -m 'Updating to $(version)'; \
	git tag $(version); \
	git push --quiet origin dist; \
	git push --quiet origin --tags

.PHONY: build deploy publish

install:
	npm install

install-deps:
	npm ci

brain-games:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish
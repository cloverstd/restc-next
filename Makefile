release:
	npm run build

docs: release
	mkdir -p docs docs/image docs/get docs/post
	rm -rf docs/static
	cp -r build/static docs/static
	sed -i '' 's/"\/static/"\/restc-next\/static/g' build/index.html
	cp build/index.html docs/image
	cp build/index.html docs/get
	cp build/index.html docs/post

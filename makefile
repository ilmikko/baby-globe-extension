all: icons build

icons:
	cd img && make

build:
	! test -f baby-globe-extension.zip || rm -f baby-globe-extension.zip;
	zip -r baby-globe-extension.zip --compression-method deflate -- *;

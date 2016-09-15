# MeteoRemote
A gyroscopic remote control between your PC and your Smartphone made with [Meteor](https://www.meteor.com/) 1.4.1.1

### See the demo [meteoremote.mybluemix.net](http://meteoremote.mybluemix.net/)

## Packages in use
* [Iron Router](https://github.com/iron-meteor/iron-router)
* [Blaze](http://blazejs.org/)
* [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI-Meteor)
* [qrcode-npm](https://www.npmjs.com/package/qrcode-npm)


## Deploy to IBM Bluemix

*You need to have your account and app prepared on [Bluemix](https://console.bluemix.net/) before*

First build the meteor server with the right architecture

	meteor build ../builds/. --server-only --architecture os.linux.x86_64

Then prepare the app bundle dependencies

	cd ../builds
	rm -rf bundle
	tar xzf meteoremote.tar.gz
	cp ../meteoremote/private/bluemix_package.json ./bundle/package.json
	cd bundle/programs/server/
	npm install

Finally deploy

	cd ../../
	chmod -R +w+x *
	cf push meteoremote

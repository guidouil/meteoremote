```sh
cd
rm -rf meteoremote-source
rm -rf builds
git clone https://github.com/guidouil/meteoremote.git  meteoremote-source
cd meteoremote-source
meteor npm install --save autoprefixer babel-runtime bcrypt jquery meteor-node-stubs qrcode-npm
meteor build ../builds/. --server-only
cd ../builds/
tar xzf meteoremote-source.tar.gz
cd
forever stop meteoremote
rm -rf meteoremote
cd builds
mv bundle ../meteoremote
cd ../meteoremote/programs/server/
npm install
cd
export MONGO_URL='mongodb://127.0.0.1:27017/meteoremote'
export PORT=3333
export ROOT_URL='http://qrr.fr'
forever start --append --uid "meteoremote" meteoremote/main.js
date
```

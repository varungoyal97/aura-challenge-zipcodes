#!/usr/bin/env bash

echo "Clearing target/"
rm -rf target/
if [[ $? -eq 0 ]];then
   echo "Cleared target/ successfully"
else
   echo "Error while clearing target/"
   exit 1
fi

echo "Downloading npm dependencies"
npm install --no-package-lock
if [[ $? -eq 0 ]];then
   echo "Downloaded dependencies"
else
   echo "Failed download dependencies"
   exit 1
fi

echo "directory content"
pwd
ls -ltrh
echo ""
pwd
ls node_modules/.bin

echo "Transpiling TS into JS"
node_modules/.bin/tsc -b --verbose --extendedDiagnostics
if [[ $? -eq 0 ]];then
   echo "Transpiled TS into JS in target/ successfully"
else
   echo "Failed while transpiling TS into JS"
   exit 1
fi
echo "Build success."
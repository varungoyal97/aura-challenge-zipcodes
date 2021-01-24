npm install --no-package-lock
OUT=$?
if [ $OUT -eq 0 ];then
   echo "Downloaded dependencies"
else
   echo "Failed download dependencies"
   exit 1
fi

npm run test
 OUT=$?
 if [ $OUT -eq 0 ];then
    echo "tested successfully"
 else
    echo "Failed to test"
    exit 1
fi

echo "All tests ran successfully!"
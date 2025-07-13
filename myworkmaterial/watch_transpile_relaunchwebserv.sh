#!/opt/homebrew/bin/bash
#
# 2025/07/05
## Will be invoked within package.json : 
##./node_modules/.bin/nodemon --watch src --ext ts --exec
#at the moment : "devc": "./node_modules/.bin/nodemon --watch src --ext ts --exec ./myworkmaterial/watch_transpile_relaunchwerbser.sh"
#
#

echo "Invoked "`date`
echo "Transpilation time"
echo "I will invoke: tsc"
#transpile tsc to js, equivalent to tsc --build tsconfig.json in root folder of the project
tsc
tsc_exitcode=$?
if [ $tsc_exitcode -ne 0 ]; then
  echo "Error in transpilation, tsc add exit code: $tsc_exitcode, will exit now."
  exit 0;
fi
echo "tsc exit code: $tsc_exitcode";

echo "Time to relaunch webserver"

echo "I will now invoke : node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts"
node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts
node_exitcode=$?
echo "End of script, node exited with code $node_exitcode."

exit $node_exitcode;

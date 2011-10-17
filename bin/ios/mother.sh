#! /bin/bash
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# 
# mother.sh
#
#   Invokes the UI Automation tests using the Mother-May-UI javascript test
#   framework.
#
# Example(s):
#
#   $ ./mother.sh -i 1341234124
#                 -a Sample.app
#                 -o outputDir
#                 -v
#                 testFile.js
# 
# Discussion:
#
#   This shell script invokes `instruments' so that the supplied UI Automation
#   tests can be run against the device identified by the UDID (specified as the
#   argument to -i) is available from the Xcode's Organizer.  If the -i option
#   is specified and the device is plugged in, this script will run the tests
#   using the referenced device. If it is not supplied, this script will run the
#   tests using the simulator.
#
#   You can specify the path to the app, however, the specified app must be able
#   to be run on the specified device.  If you only give the name of the app (as
#   in Sample.app), this script will attempt to find it.  If you specif a UDID,
#   this script will attempt to find the app in the current user's Xcode build
#   directory.  In particular, the following directory will be sought out:
#
#     ~/Library/Developer/Xcode/DerivedData/.../Debug-iphoneos/Sample.app
#
#   If there are multiple app bundles that match the value of the -a argument,
#   the most recently touched one will be used.  This behavior does not occur
#   when you explicitly name the app bundle to use.
#
#   The results of this script end up in the output directory under a
#   timestamped subdirectory.
#
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Fail on any error
set -e
# Debug output
#set -x

app=""
deviceID=""
outputDir=""
targetApp=""
traceTemplate=""
command="instruments"
verbose=0
testFile=""
dateTime=$(date +%Y-%m-%dT%H.%M.%S)
usage="Usage: ${0} -i <device ID> -a <app bundle> -o <output dir> [-v] <test file>"

function fullPath {
  dir=$(dirname ${1})
  filename=$(basename ${1})
  originalDir=${PWD}
  cd "${dir}"
  absoluteDir=${PWD}
  cd ${originalDir}
  echo "${absoluteDir}/${filename}"
}

# Options

while getopts ":a:i:t:o:v" opt
do
  case ${opt} in
    a)
      app=${OPTARG}
      ;;
    i)
      deviceID=${OPTARG}
      ;;
    o)
      outputDir="${OPTARG}/${dateTime}"
      ;;
    v)
      verbose=1
      ;;
    ?)
      echo "${usage}"
      exit 1
  esac
done

shift $(($OPTIND - 1))

if [[ -z "${app}" || -z "${outputDir}" ]]
then
  echo "${usage}"
  exit 1
fi


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# Begins building up the `instruments` command options
#
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Sets the Device ID option

if [[ ! -z "${deviceID}" ]]
then
  command="${command} -w \"${deviceID}\""
fi


# Sets the Trace Template option

# Finds the default Automation trace template file.
traceTemplate=$(find /Developer/Platforms/iPhoneOS.platform/Developer/Library/Instruments -type f -name "Automation.tracetemplate")
if [[ -z "${traceTemplate}" ]]
then
  echo "Error: Could not find Automation.tracetemplate" >&2
  exit 1
else
  command="${command} -t \"${traceTemplate}\""
fi


# Sets the Target App option

# If the app is a full directory path, then use the directory path as is
if [[ -d ${app} ]]
then
  targetApp="${app}"
# The location of the app is unknown. Finds the path.
else
  # Path differs for Simulator or Device
  environment=""
  if [[ -z "${deviceID}" ]]
  then
    environment="iphonesimulator"
  else
    environment="iphoneos"
  fi

  # Finds the most recent version of the app.
  targetApp=$(find ~/Library/Developer/Xcode/DerivedData -type d -path "*/Build/Products/Debug-${environment}/${app}" -ls \
    | sort -M -k8,10 \
    | awk '{ print $11 }')
fi

if [[ -z "${targetApp}" ]]
then
  echo "Error: Could not find ${app}" >&2
  exit 1
else
  command="${command} \"${targetApp}\""
fi


# Sets the Output directory for the trace results

if [[ ! -d "${outputDir}" ]]
then
  mkdir -p "${outputDir}"
fi

outputDir="$(fullPath "${outputDir}")"
command="${command} -e UIARESULTSPATH \"${outputDir}\""


# Trace Document
# instruments doesn't currently seem to respect this

command="${command} -d \"${outputDir}/mother.trace\""


# Sets the Test File

if [[ -z "$*" ]]
then
  echo "Error: No test scripts were given"
  exit 1
else
  for scriptFile in "$*"
  do
    if [[ -f "${scriptFile}" ]]
    then
      testFile=$(fullPath "${scriptFile}")
    else
      echo "Error: Could not find ${scriptFile}"
      exit 1
    fi
  done

  command="${command} -e UIASCRIPT \"${testFile}\""
fi

if (( ${verbose} > 0))
then
  echo "${command}"
fi


# Workaround the output trace file by just changing to the output directory so any output ends up in there

originalDir=${PWD}
tempOutputDir="${outputDir}/tmp-$$"
mkdir "${tempOutputDir}"
cd "${tempOutputDir}"

eval ${command} || exit 1

for tempTraceDocument in $(ls "${tempOutputDir}")
do
  targetAppName=$(basename "${targetApp}")
  finalTraceDocument="${outputDir}/${targetAppName}.trace"
  mv "${tempTraceDocument}" "${finalTraceDocument}"
done

rm -rf "${tempOutputDir}"

# Restore the working directory

cd "${originalDir}"
echo "Results are located in ${outputDir}"

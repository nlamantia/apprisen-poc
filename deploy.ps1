############## REQUIREMENTS FOR THIS SCRIPT TO RUN ##################
# - Git and npm CLIs are installed                                  #
# - Git remote named "origin" exists and points to the right remote #
#####################################################################

# get destination, and environment parameters if present
param([String]$dest, [String]$e="prod")

# set deploy-to environment
$branch = "master"
$loginUrl = "https://login.apprisen.com"
$icmUrl = "https://icm-services.apprisen.com"
If ($e -eq "test") {
	$branch = "develop"
	$icmUrl = "https://icm-services-testing.apprisen.com"
}

# pull down the latest source code
git checkout $branch
git pull

# set environment variables for base URLs
$Env:REACT_APP_SERVICE_BASE_URL = $icmUrl
$Env:REACT_APP_LOGIN_BASE_URL = $loginUrl

# build the ionic project to create the build folder
npm install
npm run build

# copy the contents of the build folder to the IIS directory
If (Test-Path $dest) {
	Copy-Item -Path ".\build\*" -Destination $dest -Recurse -Force
	echo "Successfully deployed to $dest"
} Else {
	echo "Cannot copy build directory to this path: file does not exist."
}

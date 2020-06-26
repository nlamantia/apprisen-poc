# get serve destination
param([String]$dest=".")

If ($dest) {
    npm install -g serve
    serve -s $dest
} Else {
    echo "Cannot serve site. No destination specified."
}
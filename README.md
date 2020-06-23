# Apprisen Client Portal #

## Setup ##
Ensure the following software is installed on your machine:

- Node/NPM
- Git

## Deployment ##
### Web ###
A powershell script with the name deploy.ps1 exists in the project root.
It has the following syntax:
```aidl
> .\deploy.ps1 -dest <destination for IIS server> [-e <test|prod>]
```

NOTE: You MUST be using the **project root** as your working directory or this script will not work.

Execute the above command in a powershell session with admin privileges on the desired server, specifying
the destination that the built web files should be copied to and *optionally*
the environment this IIS server will serve (either **test** or **prod**).

### Mobile ###
Coming soon...

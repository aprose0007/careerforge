# push_to_github.ps1
param (
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

git remote add origin $RepoUrl
git branch -M main
git push -u origin main

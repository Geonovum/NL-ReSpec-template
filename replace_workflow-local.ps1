# replace_workflow-local.ps1

$ErrorActionPreference = "Stop"

$TEMPLATE_REPO = "https://github.com/Geonovum/NL-ReSpec-template"
$TEMP_DIR = "NL-ReSpec-template-temp"
$LOCAL_DIR = Get-Location

Write-Host "➡️  Clonen van NL-ReSpec-template..."
git clone $TEMPLATE_REPO $TEMP_DIR

if (-not (Test-Path $TEMP_DIR)) {
    Write-Error "❌ Het clonen van NL-ReSpec-template is mislukt."
    exit 1
}

Write-Host "🔄 Ophalen van remote branches..."
git fetch --all
# Haal alle remote branches op behalve HEAD/merge/etc.
$BRANCHES = git branch -r | Where-Object {$_ -notmatch "->"} | ForEach-Object { $_.Trim() -replace "^origin/", "" } | Sort-Object -Unique

$README_NOTICE = @"
⚠️ Deze repository is automatisch bijgewerkt naar de nieuwste workflow.
Voor vragen, neem contact op met [Linda van den Brink](mailto:l.vandenbrink@geonovum.nl) of [Wilko Quak](mailto:w.quak@geonovum.nl).

Als je een nieuwe publicatie wilt starten, lees dan eerst de instructies in de README van de NL-ReSpec-template:
[https://github.com/Geonovum/NL-ReSpec-template](https://github.com/Geonovum/NL-ReSpec-template).
"@

foreach ($BRANCH in $BRANCHES) {
    Write-Host "🔁 Verwerken van branch: $BRANCH"
    git checkout $BRANCH
    git pull origin $BRANCH

    Write-Host "🧹 Vervangen van .github/workflows..."
    Remove-Item -Recurse -Force ".github/workflows" -ErrorAction SilentlyContinue
    if (-not (Test-Path ".github")) { New-Item ".github" -ItemType Directory | Out-Null }
    Copy-Item -Recurse "$TEMP_DIR/.github/workflows" ".github/"

    # README.md aanpassen
    $readmeFile = "README.md"
    $noticeRegex = "automatisch bijgewerkt naar de nieuwste workflow"

    if (Test-Path $readmeFile) {
        $readmeContent = Get-Content $readmeFile -Raw
        if ($readmeContent -notmatch $noticeRegex) {
            $newContent = "$README_NOTICE`r`n`r`n$readmeContent"
            Set-Content $readmeFile $newContent
            Write-Host "📘 README.md aangepast."
        } else {
            Write-Host "📘 README.md bevat al de melding."
        }
    } else {
        Set-Content $readmeFile $README_NOTICE
        Write-Host "📘 README.md aangemaakt."
    }

    # Check for changes
    $status = git status --porcelain
    if ($status) {
        git add .github/workflows README.md
        git commit -m "Update workflows en README vanuit NL-ReSpec-template"
        git push origin $BRANCH
        Write-Host "✅ Branch '$BRANCH' bijgewerkt en gepusht."
    } else {
        Write-Host "ℹ️  Geen wijzigingen in branch '$BRANCH'."
    }
}

# Opruimen
Remove-Item -Recurse -Force $TEMP_DIR
git checkout main

Write-Host "Alle branches zijn verwerkt en bijgewerkt."

#!/bin/bash

# Uitvoeren van het script op Windows (Git Bash):
# 1. Open Git Bash in de hoofdmap van je project:
#    - Open de Windows Verkenner (map-icoon in je taakbalk).
#    - Navigeer naar de map waar jouw project staat.
#    - Klik in de adresbalk bovenin Verkenner en typ bash, gevolgd door Enter.
#    Je krijgt nu een Git Bash-venster dat direct in deze projectmap is gestart.
# 2. (Optioneel) Maak het script uitvoerbaar met:
#      chmod +x update_workflow.sh
#    Op Windows kun je dit meestal overslaan en direct naar stap 3 gaan.
# 3. Voer het script uit met:
#      bash update_workflow.sh


# Repository URL
TEMPLATE_REPO="https://github.com/Geonovum/NL-ReSpec-template"

# Tijdelijke map voor de template
TEMP_DIR="NL-ReSpec-template-temp"

# Clone de NL-ReSpec-template
echo "➡️  Clonen van NL-ReSpec-template..."
git clone "$TEMPLATE_REPO" "$TEMP_DIR"

# Controleer of clone succesvol was
if [ ! -d "$TEMP_DIR" ]; then
  echo "❌ Het clonen van NL-ReSpec-template is mislukt."
  exit 1
fi

# Vervang workflows
rm -rf .github/workflows
mkdir -p .github
cp -R "$TEMP_DIR/.github/workflows" .github/

# Verwijder de tijdelijke clone
rm -rf "$TEMP_DIR"

# Commit en push als er wijzigingen zijn
if [ -n "$(git status --porcelain)" ]; then
  git add .github/workflows
  git commit -m "Update workflows vanuit NL-ReSpec-template"
  git push origin main
  echo "✅ Workflows succesvol geüpdatet."
else
  echo "ℹ️  Geen wijzigingen gevonden."
fi

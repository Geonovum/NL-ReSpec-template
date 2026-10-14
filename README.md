## ReSpec template instructies

ReSpec is een tool om HTML- en PDF-documenten te genereren op basis van markdowncontent. Deze template helpt je bij het opstellen en publiceren van documenten volgens de Geonovum-standaard.

De dynamische voorbeeldpagina van het template is [hier te bekijken](https://geonovum.github.io/NL-ReSpec-GN-template/).

---

## Starten

Gebruik de knop [*Gebruik deze template*](https://github.com/Geonovum/NL-ReSpec-template/generate?description=Geonovum+documenttemplate) om een nieuwe repository aan te maken:

* **Owner:** kies `Geonovum` als je daar rechten voor hebt.
* **Visibility:** kies **Public**.

> ℹ️ Na het aanmaken moet je **handmatig GitHub Pages activeren** in de instellingen van je nieuwe repository:
>
> * Ga naar `Settings` → `Pages`
> * Kies onder “Source” de branch `main` en map `/ (root)`

---

## Gebruikersinstructie

Voor het aanpassen van het document raden we aan om een IDE te gebruiken, zoals [Visual Studio Code](https://code.visualstudio.com/). Deze geeft een voorbeeldweergave van je markdown en helpt bij het beheren van je bestanden.

### Aanpassen van content

* Pas instellingen aan in de configuratiebestanden (`config.js`)
* Voeg markdown-bestanden toe of wijzig bestaande bestanden

### Configuratiebestanden

* [`js/config.js`](js/config.js): bevat document-specifieke instellingen zoals titel, status en auteurs
* [`organisation-config.js`](https://tools.geostandaarden.nl/respec/config/geonovum-config.js): bevat algemene informatie over de organisatie

Beide bestanden worden gelinkt in de [`index.html`](index.html)

### Content schrijven

* Gebruik markdown of HTML
* Splits content idealiter per hoofdstuk in losse bestanden
* Voeg nieuwe secties toe aan de `index.html` via `data-include`:

```html
<section data-include-format="markdown" data-include="ch01.md" class="informative"></section>
<section data-include-format="markdown" data-include="ch02.md"></section>
```

CSS-classes zijn ook bruikbaar in markdown via HTML:

```html
<div class="example">voorbeeld</div>
```

Meer info:
* [Geonovum ReSpec handleiding](https://geonovum.github.io/handleiding-tooling/ReSpec/)
* [ReSpec documentatie](https://respec.org/docs/#css-classes)

---

## Automatische checks en build

De GitHub Actions workflow draait automatisch bij iedere commit of bij een GitHub Release. Daarbij gebeuren de volgende stappen:

1. HTML wordt gegenereerd met [ReSpec](https://respec.org/)
2. (optioneel) PDF wordt gegenereerd — indien `alternateFormats` is ingesteld in `config.js`:

```js
alternateFormats: [
  {
    label: "pdf",
    uri: "template.pdf",
  },
]
```

3. Automatische controles worden uitgevoerd:

    * HTML-validatie
    * WCAG-check (toegankelijkheid)
    * Linkcheck (controleren van verwijzingen)

De resultaten zijn zichtbaar in het tabblad **Actions** van je repository.

---

## Publiceren van documenten

Wanneer je document klaar is, publiceer je via **GitHub Releases**:

### Controle vóór publiceren

Controleer vóór het maken van een pre-release of release in **Actions** de
`Main Workflow` van de commit die je wilt publiceren. De job
`Snapshot + Checks` moet groen zijn en de samenvatting moet
**“Publicatiegereed: ja”** tonen. Proof HTML en de Lychee-linkcontrole zijn
blokkerend; bij **“Publicatiegereed: nee”** moet je de gemelde fouten eerst
oplossen.

### Pre-release (testomgeving)

* Ga naar het tabblad **Releases** in je eigen repo
* Klik op **“Create a new release”**
* Geef een tag aan bij, Choose a tag (bijv. `v0.1.0`) en klik op **“Create new tag”**
* **Vink aan:** “This is a pre-release” onderop deze pagina
* Klik op **“Publish release”**

💡 Dit publiceert je document automatisch op:
https://test.docs.geostandaarden.nl/

(De exacte URL wordt bepaald door waarden in `config.js`)

### Release (productieomgeving)

* Ga opnieuw naar **Releases**
* Klik op **“Create a new release”**
* Geef een tag aan bij, Choose a tag (bijv. `v0.1.0`) en klik op **“Create new tag”**
* Laat “pre-release” uitgevinkt
* Klik op **“Publish release”**

💡 Dit maakt automatisch een **Pull Request** aan naar:
[`Geonovum/docs.geostandaarden.nl`](https://github.com/Geonovum/docs.geostandaarden.nl/pulls)

Na goedkeuring van de PR wordt het document gepubliceerd op:
https://docs.geostandaarden.nl/

---

## Workflows

De workflows in `.github/workflows/` (`main.yml` en `visual-regression.yml`)
roepen de centrale workflows aan uit
[NL-ReSpec-workflows](https://github.com/Geonovum/NL-ReSpec-workflows). Pas
deze bestanden niet aan: ze worden centraal beheerd en bijgewerkt. Vragen of
wijzigingen over de build, controles of publicatie horen in die repository.

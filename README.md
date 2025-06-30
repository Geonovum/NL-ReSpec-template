## ReSpec template instructies

ReSpec is een tool om html en pdf documenten te genereren op basis van markdown content.

### Vereiste voor gebruik
- Kennis van git/github
- Kennis van markdown en/of HTML
- Een webserver om de documentatie te hosten

## Starten

Gebruik de knop [*Use this template*](https://github.com/Geonovum/NL-ReSpec-template/generate?description=Geonovum+documenttemplate) om een nieuwe repository aan te maken:

* **Owner:** kies `Geonovum` als je daar rechten voor hebt.
* **Visibility:** kies **Public**.

> ℹ️ Na het aanmaken moet je **handmatig GitHub Pages activeren** in de instellingen van je nieuwe repository:
>
> * Ga naar `Settings` → `Pages`
> * Kies onder “Source” de branch `main` en map `/ (root)`

---

## Publiceren van documenten

Zodra je content klaar is, kun je publiceren via een **GitHub release**:

### Pre-release (testomgeving)

* Ga in je eigen repository naar het tabblad **“Releases”**
* Klik op **“Draft a new release”**
* Kies een versienummer (bijv. `v0.1.0`)
* **Vink aan:** “This is a pre-release”
* Klik op **“Publish release”**

Deze actie:

* Genereert automatisch een nieuwe versie van het document
* Publiceert het naar:
  `https://test.docs.geostandaarden.nl/`

(De exacte URL wordt afgeleid van `config.js`.)

---

### Release (productieomgeving)

* Ga opnieuw naar het tabblad **“Releases”**
* Klik op **“Draft a new release”**
* Kies een nieuwe versienaam (bijv. `v1.0.0`)
* **Laat “pre-release” uitgevinkt**
* Klik op **“Publish release”**

Deze actie:

* Maakt een **Pull Request aan** naar [`Geonovum/docs.geostandaarden.nl`](https://github.com/Geonovum/docs.geostandaarden.nl/pulls)
* Zodra die PR wordt **gemerged**, wordt je document zichtbaar op:
  `https://docs.geostandaarden.nl/`

---

## Wat wordt automatisch gegenereerd & gecontroleerd?

Bij iedere wijziging aan de `main` of `develop` branch:

1. **HTML** wordt gegenereerd met [ReSpec](https://respec.org/)
2. Indien geconfigureerd, wordt er ook een **PDF** gegenereerd
3. De volgende automatische checks draaien:

   * HTML-validatie (W3C)
   * WCAG toegankelijkheidscontrole (via [pa11y](https://github.com/pa11y/pa11y))
   * Linkcontrole (verwijzingen binnen het document)

---
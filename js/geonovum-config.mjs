// Dit bestand is gepubliceerd als https://tools.geostandaarden.nl/respec/config/geonovum-config.js, voor hergebruik in Geonovum ReSpec documenten.
var organisationConfig = {
  nl_organisationName: "Geonovum",
  // werkt nog niet
  // ILaR: pat naar bro/dso bestaat niet
  nl_organisationStylesURL: "https://tools.geostandaarden.nl/respec/style/",
  // bv styles url voor ander GN publicatiedomein met eigen stijlen zoals DSO of BRO:
  // nl_organisationStylesURL: "https://tools.geostandaarden.nl/respec/dso/style/",
  // nl_organisationStylesURL: "https://tools.geostandaarden.nl/respec/bro/style/",
  nl_organisationPublishURL: "https://docs.geostandaarden.nl/",
  logos: [
    {
      src: "https://docs.geostandaarden.nl/media/Geonovum.svg",
      alt: "Geonovum",
      id: "Geonovum",
      height: 67,
      width: 132,
      url: "https://www.geonovum.nl/geo-standaarden"
    }
  ],

  postProcess: [window.respecMermaid.createFigures],

  latestVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "shortName",
    "/",
  ],
  thisVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "specStatus",
    "-",
    "specType",
    "-",
    "shortName",
    "-",
    "publishDate",
  ],
  prevVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "previousMaturity",
    "-",
    "specType",
    "-",
    "shortName",
    "-",
    "previousPublishDate",
  ],
  useLogo: true,
  useLabel: true,

  license: "cc-by",
  addSectionLinks: true,

  localizationStrings: {
    en: {
      wv: "Editor's draft",
      cv: "Candidate recommendation",
      vv: "Proposed recommendation",
      def: "Recommendation",
      ld: "Living document",
      basis: "Document",
      //eo: "Outdated version",
      //tg: "Rescinded version",
      no: "Norm",
      st: "Standard",
      im: "Information model",
      pr: "Practical guideline",
      hr: "Guide",
      wa: "Work process agreement",
      al: "General",
      bd: "Governance documentation",
      bp: "Best practice",
    },
    nl: {
      wv: "Werkversie",
      cv: "Consultatieversie",
      vv: "Versie ter vaststelling",
      def: "Vastgestelde versie",
      ld: "Levend document",
      basis: "Document",
      //eo: "Verouderde versie",
      //tg: "Teruggetrokken versie",
      no: "Norm",
      st: "Standaard",
      im: "Informatiemodel",
      pr: "Praktijkrichtlijn",
      hr: "Handreiking",
      wa: "Werkafspraak",
      al: "Algemeen",
      bd: "Beheerdocumentatie",
      bp: "Best practice",
    },
  },

  sotdText: {
    nl: {
      sotd: "Status van dit document",
      def: `Dit is de definitieve versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
      wv: `Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen stabiel document.`,
      cv: `Dit is een consultatieversie.`,
      vv: `Dit is de definitieve conceptversie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
      basis: "Dit is een document zonder officiÃ«le status.",
      ld: "Dit is een levend document dat regelmatig gewijzigd wordt.",
    },
    en: {
      sotd: "Status of this document",
      def: `This is the definitive version of this document. Edits resulting from consultations have been applied.`,
      wv: `This is a working draft that can be changed, removed or replaced by other documents at any time. It is not a stable document.`,
      cv: `This is a stable draft, published for public comment.`,
      vv: `This is the final draft of this document. Edits resulting from consultations have been applied.`,
      basis: "This document has no official standing.",
      ld: "This is a living document, which is updated regularly.",
    },
  },

  labelColor: {
    def: "#045D9F",
    wv: "#FF0000",
    cv: "#045D9F",
    vv: "#045D9F",
    basis: "#80CC28",
    ld: "#80CC28",
  },

  licenses: {
    cc0: {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      image:
        "https://docs.geostandaarden.nl/media/CC-Licentie.svg",
    },
    "cc-by": {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
      image: "https://docs.geostandaarden.nl/media/cc-by.svg",
    },
    "cc-by-nd": {
      name: "Creative Commons Naamsvermelding-GeenAfgeleideWerken 4.0 Internationaal",
      short: "CC-BY-ND",
      url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
      image: "https://docs.geostandaarden.nl/media/cc-by-nd.svg",
    },
  },

  localBiblio: {
    SemVer: {
      href: "https://semver.org",
      title: "Semantic Versioning 2.0.0",
      authors: ["T. Preston-Werner"],
      date: "June 2013",
    },
    MIM12: {
      id: "MIM12",
      title: "MIM - Metamodel Informatie Modellering (Versie 1.2)",
      href: "https://docs.geostandaarden.nl/mim/def-st-mim-20240613/",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2024-06-13",
    },
    "3DTILES": {
      title: "3D Tiles Specification 1.0",
      href: "http://docs.opengeospatial.org/cs/18-053r2/18-053r2.html",
      status: "Approved for public release",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Patrick Cozzi", "Sean Lilley", "Gabby Getz"],
      date: "2019-01-31",
      id: "3DTILES",
    },
    "adr-mod-geo": {
      title: "API Design rules Module: Geospatial",
      href: "https://docs.geostandaarden.nl/api/API-Strategie-mod-geo/",
      status: "Consultatieversie",
      publisher: "Geonovum",
      editors: ["Linda van den Brink"],
      authors: [
        "Pieter Bresters",
        "Linda van den Brink",
        "Paul van Genuchten",
        "George Mathijssen",
        "Mark Strijker",
      ],
      date: "2022-09-30",
      id: "adr-mod-geo",
    },
    CIS10: {
      title:
        "ISO 19123-2:2018 Geographic information â€” Schema for coverage geometry and functions â€” Part 2: Coverage implementation schema",
      href: "https://www.iso.org/standard/70948.html",
      status: "Published",
      publisher: "ISD",
      date: "2018-10-01",
      id: "CIS10",
    },
    CityGML2: {
      title: "OGC City Geography Markup Language (CityGML) Encoding Standard",
      href: "https://portal.ogc.org/files/?artifact_id=47842",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Gerhard GrÃ¶ger",
        "Thomas H. Kolbe",
        "Claus Nagel",
        "Karl-Heinz HÃ¤fele",
      ],
      date: "2012-04-04",
      id: "CityGML2",
    },
    CityGML3: {
      title:
        "OGC City Geography Markup Language (CityGML) Part 1: Conceptual Model Standard v3.0",
      href: "https://docs.ogc.org/is/20-010/20-010.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Thomas H. Kolbe",
        "Tatjana Kutzner",
        "Carl Stephen Smyth",
        "Claus Nagel",
        "Carsten Roensdorf",
        "Charles Heazel",
      ],
      date: "2021-09-13",
      id: "CityGML3",
    },
    CityJSON: {
      title: "CityJSON Community Standard 1.0",
      href: "https://docs.ogc.org/cs/20-072r2/20-072r2.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Hugo Ledoux"],
      date: "2021-08-13",
      id: "CityJSON",
    },
    COVJSON: {
      title: "OGC CoverageJSON Community Standard 1.0-draft_0.2.2",
      href: "https://portal.ogc.org/files/102051",
      status: "Draft",
      publisher: "Open Geospatial Consortium",
      editors: ["Chris Little", "Jon Blower", "Maik Riechert"],
      id: "COVJSON",
    },
    CSW2APISO: {
      title:
        "OpenGIS Catalogue Services Specification 2.0.2 - ISO Metadata Application Profile",
      href: "http://portal.opengeospatial.org/files/?artifact_id=21460",
      status: ["Adopted specification"],
      publisher: "Open Geospatial Consortium",
      id: "CSW2APISO",
    },
    CSWISOAP: {
      title:
        "OGC 07-045r2: OGC Catalogue Services Specification 2.0.2 - ISO Metadata Application Profile: Corrigendum, version 1.0.2",
      href: "https://portal.ogc.org/files/80534",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Uwe Voges", "Kristian Senkler"],
      date: "2020-11-19",
      id: "CSWISOAP",
    },
    "DCAT-AP-2.1.1": {
      title: "DCAT Application Profile for data portals in Europe 2.1.1",
      href: "https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe/releases",
      publisher: "European Commission",
      date: "2022-06-24",
      id: "DCAT-AP-2.1.1",
    },
    epsg: {
      title: "EPSG Geodetic Parameter Dataset",
      href: "https://epsg.org/home.html",
      status: "Published",
      publisher: "Geodesy Subcommittee of the IOGP Geomatics Committee",
      id: "epsg",
    },
    FE20: {
      title:
        "OGC 09-026r2: OGC Filter Encoding 2.0 Encoding Standard - With Corrigendum, Version 2.0.3",
      href: "http://docs.opengeospatial.org/is/09-026r2/09-026r2.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "Panagiotis (Peter) A. Vretanos",
      date: "2014-08-18",
      id: "FE20",
    },
    GeoPackage: {
      title: "OGC GeoPackage Encoding Standard - with Corrigendum, v1.3.1",
      href: "https://www.geopackage.org/spec131/",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Jeff Yutzler"],
      date: "2021-11-16",
      id: "GeoPackage",
    },
    GEOSPARQL11: {
      title: "OGC GeoSPARQL - A Geographic Query Language for RDF Data",
      href: "https://opengeospatial.github.io/ogc-geosparql/geosparql11/spec.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: [
        "Nicholas J. Car",
        "Timo Homburg",
        "Matthew Perry",
        "John Herring",
        "Frans Knibbe",
        "Simon J.D. Cox",
        "Joseph Abhayaratna",
        "Mathias Bonduel",
      ],
      date: "2022",
      id: "GEOSPARQL11",
    },
    GeoTIFF: {
      title: "OGC GeoTIFF standard v1.1",
      href: "http://docs.opengeospatial.org/is/19-008r4/19-008r4.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Emmanuel Devys",
        "Ted Habermann",
        "Chuck Heazel",
        "Roger Lott",
        "Even Rouault",
      ],
      date: "2019-09-14",
      id: "GeoTIFF",
    },
    GIMEG: {
      href: "https://docs.geostandaarden.nl/nen3610/gimeg",
      publisher: "Geonovum",
      status: "Vastgesteld",
      authors: ["Linda van den Brink", "Paul Janssen", "Wilko Quak"],
      title: "Geometrie in model en GML",
      date: "2021-03-26",
      id: "GIMEG",
    },
    GML31: {
      title:
        "OpenGISÂ® Geography Markup Language (GML) Implementation Specification, v3.1.1",
      href: "https://portal.ogc.org/files/?artifact_id=4700",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Simon Cox",
        "Paul Daisey",
        "Ron Lake",
        "Clemens Portele",
        "Arliss Whiteside",
      ],
      date: "2004-02-07",
      id: "GML31",
    },
    GML33: {
      title:
        "OGCÂ® Geography Markup Language (GML) â€” Extended schemas and encoding rules, v3.3",
      href: "https://portal.ogc.org/files/?artifact_id=46568",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Clemens Portele"],
      date: "2012-02-07",
      id: "GML33",
    },
    GMLJPEG2000: {
      title:
        "OGCÂ® GML in JPEG 2000 (GMLJP2) Encoding Standard Part 1: Core v.2.1",
      href: "http://docs.opengeospatial.org/is/08-085r8/08-085r8.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Lucio Colaiacomo",
        "Joan MasÃ³",
        "Emmanuel Devys",
        "Eric Hirschorn",
      ],
      date: "2018-08-27",
      id: "GMLJPEG2000",
    },
    GMLSF: {
      title:
        "Geography Markup Language (GML) simple features profile (with Corrigendum) (2.0)",
      href: "https://portal.ogc.org/files/?artifact_id=42729",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: [
        "Linda van den Brink",
        "Clemens Portele",
        "Panagiotis (Peter) A. Vretanos",
      ],
      date: "2012-04-05",
      id: "GMLSF",
    },
    HDF5: {
      title: "OGC Hierarchical Data Format Version 5 (HDF5Â®) Core Standard",
      href: "http://docs.opengeospatial.org/is/18-043r3/18-043r3.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Aleksandar Jelenak", "Ted Habermann", "Gerd Heber"],
      date: "2019-03-27",
      id: "HDF5",
    },
    HDFEOS: {
      title: "HDF-EOS5 Data Model, File Format and Library (v1.1)",
      href: "https://www.earthdata.nasa.gov/sites/default/files/imported/ESDS-RFC-008-v1.1.pdf",
      status: "Recommended",
      publisher: "NASA",
      editors: ["Larry Klein", "Abe Taaheri"],
      date: "2016-05-01",
      id: "HDFEOS",
    },
    HRCRS: {
      title:
        "Handreiking Gebruik coÃ¶rdinaatreferentiesystemen bij uitwisseling en visualisatie van geo-informatie",
      href: "https://docs.geostandaarden.nl/crs/crs/",
      status: "Definitief",
      publisher: "Geonovum",
      editors: ["Friso Penninga", "Lennard Huisman"],
      date: "2022-03-14",
      id: "HRCRS",
    },
    HRLFG: {
      title: "Geometrie in uitwisselingsformaten",
      href: "https://docs.geostandaarden.nl/g4w/geox/#inleiding",
      status: "Definitief",
      publisher: "Geonovum",
      editors: ["Linda van den Brink", "Gabriella Wiersma"],
      date: "2022-02-04",
      id: "HRLFG",
    },
    HRTOEG: {
      title: "Handreiking digitaal toegankelijk locatiedata",
      href: "https://docs.geostandaarden.nl/visu/toeg/",
      status: "Vastgesteld",
      publisher: "Geonovum",
      editors: [
        "Edward Mac Gillavry",
        "Sjors Slaats",
        "Theo OVerduin",
        "Thijs Brentjens",
        "Victor Zuydweg",
      ],
      date: "2021-08-02",
      id: "HRTOEG",
    },
    HRWC: {
      title: "Handreiking webcartografie",
      href: "https://www.geonovum.nl/uploads/standards/downloads/handreiking%20webcartografie%201.0.1_0.pdf",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2010-11-18",
      id: "HRWC",
    },
    I3S: {
      title:
        "OGC Indexed 3d Scene Layer (I3S) and Scene Layer Package (*.slpk) Format Community Standard Version 1.2",
      href: "http://docs.opengeospatial.org/cs/17-014r8/17-014r8.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Carl Reed", "Tamrat Belayneh"],
      date: "2021-05-11",
      id: "I3S",
    },
    IMMetingen: {
      title: "Informatiemodel Metingen",
      href: "https://www.sikb.nl/datastandaarden/richtlijnen/sikb0101",
      status: "Vastgesteld",
      publisher: "SIKB en IHW",
      id: "IMMetingen",
    },
    INSGPGeopackage: {
      title: "GeoPackage encoding of INSPIRE datasets. INSPIRE good practise",
      href: "https://inspire.ec.europa.eu/good-practice/geopackage-encoding-inspire-datasets",
      status: "Candidate",
      publisher: "INSPIRE",
      id: "INSGPGeopackage",
    },
    INSGPOAPIF: {
      title: "OGC API - Features as an INSPIRE download service",
      href: "https://inspire.ec.europa.eu/good-practice/ogc-api-%E2%80%93-features-inspire-download-service",
      status: "Endorsed Good Practice",
      publisher: "IOC TF",
      id: "INSGPOAPIF",
    },
    INSGPSTA: {
      title: "OGC SensorThings API as an INSPIRE download service",
      href: "https://inspire.ec.europa.eu/good-practice/ogc-sensorthings-api-inspire-download-service",
      status: "Endorsed good practice",
      publisher: "INSPIRE Maintenance and Implementation Group (MIG)",
      id: "INSGPSTA",
    },
    "inspire-19115-19119": {
      title:
        "INSPIRE Metadata Implementing Rules: Technical Guidelines based on EN ISO 19115 and EN ISO 19119",
      href: "http://inspire.ec.europa.eu/documents/Metadata/INSPIRE_MD_IR_and_ISO_v1_2_20100616.pdf",
      authors: [
        "Drafting Team Metadata and European Commission Joint Research Centre",
      ],
      publisher: "European Commission Joint Research Centre",
      date: "2007-10-26",
      id: "inspire-19115-19119",
    },
    "inspire-cirmd": {
      title: "Corrigendum to INSPIRE Metadata Regulation",
      href: "https://eur-lex.europa.eu/legal-content/NL/TXT/PDF/?uri=CELEX:32008R1205R(02)&from=EN",
      authors: [
        "Drafting Team Metadata and European Commission Joint Research Centre",
      ],
      publisher: "European Commission Joint Research Centre",
      date: "2010-01-15",
      id: "inspire-cirmd",
    },
    "inspire-crs": {
      title:
        "INSPIRE Data Specification on Coordinate Reference Systems - Technical Guidelines",
      href: "https://inspire.ec.europa.eu/id/document/tg/rs",
      status: "Published",
      publisher:
        "INSPIRE Thematic Working Group Coordinate Reference Systems & Geographical Grid Systems",
      date: "2014-04-16",
      id: "inspire-crs",
    },
    "inspire-gcm": {
      title: "Generic Conceptual Model of the INSPIRE data specifications",
      href: "https://inspire.ec.europa.eu/documents/inspire-generic-conceptual-model",
      status: "Published",
      publisher: "INSPIRE Drafting Team Data Specifications",
      date: "2014-04-07",
      id: "inspire-gcm",
    },
    "inspire-gen": {
      title: "Guidelines for the encoding of spatial data",
      href: "https://inspire.ec.europa.eu/documents/guidelines-encoding-spatial-data",
      status: "Published",
      publisher: "INSPIRE Drafting Team Data Specifications",
      date: "2014-04-08",
      id: "inspire-gen",
    },
    "inspire-ggs": {
      title:
        "Guidelines INSPIRE Data Specification on Geographical Grid Systems - Technical Guidelines",
      href: "https://inspire.ec.europa.eu/id/document/tg/gg",
      status: "Published",
      publisher:
        "INSPIRE Thematic Working Group Coordinate Reference Systems & Geographical Grid Systems",
      date: "2014-04-16",
      id: "inspire-ggs",
    },
    "inspire-irmd": {
      title: "Implementing Rules for Metadata",
      href: "http://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32008R1205",
      authors: [
        "Drafting Team Metadata and European Commission Joint Research Centre",
      ],
      publisher: "European Commission Joint Research Centre",
      date: "2008-12-03",
      id: "inspire-irmd",
    },
    "inspire-mds": {
      title:
        "Methodology for the development of data specifications: baseline version (D 2.6, Version 3.0)",
      href: "https://inspire.ec.europa.eu/documents/methodology-development-data-specifications-baseline-version-d-26-version-30",
      status: "Published",
      publisher: "INSPIRE Drafting Team Data Specifications",
      date: "2008-04-06",
      id: "inspire-mds",
    },
    "inspire-TG-metadata": {
      title:
        "Technical Guidance for the implementation of INSPIRE dataset and service metadata based on ISO/TS 19139:2007",
      href: "https://github.com/INSPIRE-MIF/technical-guidelines/blob/2022.2/metadata/metadata-iso19139/metadata-iso19139.adoc",
      status: ["Tehnical Guidance"],
      authors: ["Temporary MIWP 2021-2024 sub-group 2.3.1"],
      publisher: "INSPIRE Maintenance and Implementation Group (MIG)",
      date: "2022-08-01",
      id: "inspire-TG-metadata",
    },
    INSTGDiS: {
      title:
        "Technical Guidance for the implementation of Inspire Discovery Service, version 3.1",
      href: "https://inspire.ec.europa.eu/documents/technical-guidance-implementation-inspire-discovery-services-0",
      status: "Approved",
      publisher: "IOC TF",
      date: "2011-11-07",
      id: "INSTGDiS",
    },
    INSTGDS: {
      title:
        "Technical Guidance for the implementation of Inspire Download Services",
      href: "https://inspire.ec.europa.eu/documents/technical-guidance-implementation-inspire-download-services",
      status: "Approved",
      publisher: "IOC TF",
      date: "2013-08-09",
      id: "INSTGDS",
    },
    INSTGDSSOS: {
      title:
        "Technical Guidance for implementing download services using the OGC Sensor Observation Service and ISO 19143 Filter Encoding, version 1.0",
      href: "https://inspire.ec.europa.eu/id/document/tg/download-sos",
      status: "Approved",
      publisher: "INSPIRE Maintenance and Implementation Group (MIG)",
      date: "2016-12-16",
      id: "INSTGDSSOS",
    },
    INSTGDSWCS: {
      title:
        "Technical Guidance for the implementation of Inspire Download Services using Web Coverage Services (WCS), version 1.0",
      href: "https://inspire.ec.europa.eu/id/document/tg/download-wcs",
      status: "Approved",
      publisher: "INSPIRE Maintenance and Implementation Group (MIG)",
      date: "2016-12-16",
      id: "INSTGDSWCS",
    },
    INSTGVS: {
      title:
        "Technical Guidance for the implementation of Inspire View Service",
      href: "https://inspire.ec.europa.eu/documents/technical-guidance-implementation-inspire-view-services-1",
      status: "Definitief",
      publisher: "IOC TF",
      date: "2022-08-01",
      id: "INSTGVS",
    },
    ISO15836: {
      title:
        "ISO 15836: 2004, Information and documentation - The Dublin Core metadata element set",
      href: "https://www.iso.org/standard/37629.htm",
      publisher: "International Organization for Standardization",
      date: "2004",
      id: "ISO15836",
    },
    ISO19101: {
      title:
        "ISO 19101-1:2014 Geographic information â€” Reference model â€” Part 1: Fundamentals",
      href: "https://www.iso.org/standard/59164.html",
      status: "Published",
      publisher: "ISO",
      date: "2014-11-01",
      id: "ISO19101",
    },
    ISO19103: {
      title:
        "ISO 19103:2015 Geographic information â€” Conceptual schema language",
      href: "https://www.iso.org/standard/56734.html",
      status: "Published",
      publisher: "ISO",
      date: "2015-12-01",
      id: "ISO19103",
    },
    ISO19107: {
      title: "ISO 19107:2019 Geographic information â€” Spatial schema",
      href: "https://www.iso.org/standard/66175.html",
      status: "Published",
      publisher: "ISO",
      date: "2019-12-01",
      id: "ISO19107",
    },
    ISO19108: {
      title: "ISO 19108:2002 Geographic information â€” Temporal schema",
      href: "https://www.iso.org/standard/26013.html",
      status: "Published",
      publisher: "ISO",
      date: "2012-12-08",
      id: "ISO19108",
    },
    ISO19109: {
      title:
        "ISO 19109:2015 Geographic information â€” Rules for application schema",
      href: "https://www.iso.org/standard/59193.html",
      status: "Published",
      publisher: "ISO",
      date: "2015-12-01",
      id: "ISO19109",
    },
    ISO19110: {
      title:
        "ISO 19110:2016 Geographic information â€” Methodology for feature cataloguing",
      href: "https://www.iso.org/standard/57303.html",
      status: "Published",
      publisher: "ISO",
      date: "2016-12-01",
      id: "ISO19110",
    },
    ISO19111: {
      title:
        "ISO 19111:2019 Geographic information â€” Referencing by coordinates",
      href: "https://www.iso.org/standard/74039.html",
      status: "Published",
      publisher: "ISO",
      date: "2019-01-01",
      id: "ISO19111",
    },
    "ISO19115-2003": {
      title: "ISO 19115:2003  Geographic information -- Metadata",
      href: "https://www.iso.org/standard/26020.html",
      status: ["Adopted specification"],
      publisher: "International Organization for Standardization",
      date: "2003-05-01",
      id: "ISO19115-2003",
    },
    "ISO19115-2006": {
      title:
        "ISO 19115:2003/Cor 1:2006 Geographic information â€” Metadata â€” Technical Corrigendum 1",
      href: "https://www.iso.org/standard/26020.html",
      status: ["Adopted specification"],
      publisher: "International Organization for Standardization",
      date: "2006-06-01",
      id: "ISO19115-2006",
    },
    "ISO19115-2009": {
      title:
        "ISO 19115-2:2009 Geographic information â€” Metadata â€” Part 2: Extensions for imagery and gridded data",
      href: "https://www.iso.org/standard/39229.html",
      publisher: "International Organization for Standardization",
      date: "2009-02-01",
      id: "ISO19115-2009",
    },
    "ISO19115-2014": {
      title:
        "ISO 19115-1:2014 Geographic information â€” Metadata â€” Part 1: Fundamentals",
      href: "https://www.iso.org/standard/53798.html",
      publisher: "International Organization for Standardization",
      date: "2014-04-01",
      id: "ISO19115-2014",
    },
    ISO19117: {
      title: "ISO 19117:2012 Geographic Information - Portrayal",
      href: "https://www.iso.org/standard/46226.html",
      status: "Published",
      publisher: "ISO",
      date: "2012-12-01",
      id: "ISO19117",
    },
    ISO19118: {
      title: "ISO 19118:2011 Geographic information â€” Encoding",
      href: "https://www.iso.org/standard/44212.html",
      status: "Published",
      publisher: "ISO",
      date: "2011-10-01",
      id: "ISO19118",
    },
    ISO19119: {
      title: "Geographic information - Services",
      href: "https://www.iso.org/standard/39890.html",
      publisher: "International Organization for Standardization",
      date: "2005-02-01",
      id: "ISO19119",
    },
    "ISO19119-2005": {
      title: "ISO 19119:2005 Geographic information â€” Services",
      href: "https://www.iso.org/standard/39890.html",
      publisher: "International Organization for Standardization",
      date: "2005-02-01",
      id: "ISO19119-2005",
    },
    "ISO19119-2008": {
      title:
        "ISO 19119:2005/Amd 1:2008 Geographic information â€” Services â€” Amendment 1: Extensions of the service metadata model",
      href: "https://www.iso.org/standard/44268.html",
      publisher: "International Organization for Standardization",
      date: "2008-05-01",
      id: "ISO19119-2008",
    },
    "ISO19126-2009": {
      title:
        "ISO 19126:2009 Geographic information - Feature concept dictionaries and registers",
      href: "https://www.iso.org/standard/44875.html",
      status: "Published",
      publisher: "ISO",
      date: "2009-11-01",
      id: "ISO19126-2009",
    },
    ISO19131: {
      title:
        "ISO 19131:2022 Geographic information â€” Data product specifications",
      href: "https://www.iso.org/standard/85092.html",
      status: "Published",
      publisher: "ISO",
      date: "2022-11-01",
      id: "ISO19131",
    },
    ISO19136: {
      title:
        "ISO 19136-1:2020 Geographic information â€” Geography Markup Language (GML) â€” Part 1: Fundamentals",
      href: "https://www.iso.org/standard/75676.html",
      status: "Published",
      publisher: "ISO",
      date: "2020-01-01",
      id: "ISO19136",
    },
    ISO19139: {
      title:
        "ISO/TS 19139:2007 Geographic information - Metadata - XML schema implementation",
      href: "https://www.iso.org/standard/32557.html",
      status: ["Adopted specification"],
      publisher: "International Organization for Standardization",
      date: "2007-04-01",
      id: "ISO19139",
    },
    ISO6709: {
      title:
        "ISO 6709:2022 Standard representation of geographic point location by coordinates",
      href: "https://www.iso.org/standard/75147.html",
      status: "Published",
      publisher: "ISO",
      date: "2022-09-01",
      id: "ISO6709",
    },
    ISOJPEG2000: {
      title:
        "ISO/IEC 15444-1:2019 Information technology â€” JPEG 2000 image coding system â€” Part 1: Core coding system",
      href: "https://www.iso.org/standard/78321.html",
      status: "Published",
      publisher: "ISO",
      date: "2019-10-01",
      id: "ISOJPEG2000",
    },
    ISOts19127: {
      title:
        "ISO/TS 19127 Geographic Information - Geodetic codes and parameters",
      href: "https://www.iso.org/standard/41784.html",
      status: "Published",
      publisher: "ISO",
      date: "2005-06-01",
      id: "ISOts19127",
    },
    "JSON-FG": {
      title: "OGC Features and Geometries JSON - Part 1: Core",
      href: "https://docs.ogc.org/DRAFTS/21-045.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium",
      editors: ["Clemens Portele", "Panagiotis (Peter) A. Vretanos"],
      id: "JSON-FG",
    },
    MBS: {
      title: "Mapbox GL JS Style Specification",
      href: "https://docs.mapbox.com/mapbox-gl-js/style-spec/",
      status: "Unofficial",
      publisher: "Mapbox",
      id: "MBS",
    },
    MIM: {
      title: "MIM - Metamodel Informatie Modellering",
      href: "https://docs.geostandaarden.nl/mim/mim/",
      status: "Vastgesteld",
      publisher: "Geonovum",
      editors: ["Dick Krijtenburg", "Paul Janssen", "Lennart van Bergen"],
      authors: [
        "Lennart van Bergen",
        "Thies Mesdag",
        "Marco Brattinga",
        "Paul Janssen",
        "Pano Maria",
        "Johan Boer",
      ],
      date: "2022-02-17",
      id: "MIM",
    },
    NEN3610: {
      title:
        "NEN 3610:2022 nl - BBasismodel geo-informatie - Termen, definities, relaties en algemene regels voor de uitwisseling van informatie over aan de aarde gerelateerde ruimtelijke objecten",
      href: "https://www.nen.nl/nen-3610-2022-nl-296137",
      status: "Definitief",
      publisher: "NEN",
      date: "2022-05-31",
      id: "NEN3610",
    },
    NETCDF: {
      title:
        "OGC Network Common Data Form (NetCDF) Core Encoding Standard version 1.0",
      href: "https://portal.ogc.org/files/?artifact_id=43732",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Ben Domenico"],
      date: "2011-04-05",
      id: "NETCDF",
    },
    NLAPIS: {
      title: "API Strategie Algemeen (Nederlandse API Strategie I)",
      href: "https://docs.geostandaarden.nl/api/API-Strategie/",
      status: "Vastgesteld",
      publisher: "Geonovum",
      date: "2022-03-09",
      id: "NLAPIS",
    },
    NLDP: {
      title: "NEN 3610 - Linked Data",
      href: "https://docs.geostandaarden.nl/nen3610/nldp/",
      status: "Vastgesteld",
      publisher: "Geonovum",
      editors: ["Paul Janssen"],
      authors: [
        "Linda van den Brink",
        "Marco Brattinga",
        "Marinus Vonhof",
        "Niels Hoffmann",
        "Pano Maria",
        "Hans Schevers",
        "Ronald van Lanen",
        "Joep van Genuchten",
      ],
      date: "2020-03-23",
      id: "NLDP",
    },
    NLISO19115: {
      title:
        "Nederlands metadata profiel op ISO 19115 voor geografie versie 2.1.0",
      href: "https://docs.geostandaarden.nl/md/mdprofiel-iso19115/",
      status: "Vastgestelde versie",
      publisher: "Geonovum",
      date: "2020-06-30",
      id: "NLISO19115",
    },
    NLISO19119: {
      title:
        "Nederlands metadata profiel op ISO 19119 voor services versie 2.1.0",
      href: "https://docs.geostandaarden.nl/md/mdprofiel-iso19119/",
      status: "Vastgestelde versie",
      publisher: "Geonovum",
      date: "2020-06-30",
      id: "NLISO19119",
    },
    "NL-SBB-20241010": {
      title:
        "NNL-SBB - Standaard voor het beschrijven van begrippen",
      href: "https://docs.geostandaarden.nl/nl-sbb/def-st-nl-sbb-20241010/",
      status: "Vastgestelde versie",
      publisher: "Geonovum",
      date: "2024-10-10",
      id: "NL-SBB-20241010"
    },
    NLWFS: {
      title:
        "Nederlands profiel op ISO 19142 Geographic information â€” Web Feature Service, Versie 1.1",
      href: "https://www.geonovum.nl/geo-standaarden/services/nederlands-wfs-profiel-11-op-iso-19142-voor-web-feature-services-20",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2015-04-24",
      id: "NLWFS",
    },
    NLWMS: {
      title:
        "Nederlands profiel op ISO 19128 Geographic information â€” Web Map Server Interface",
      href: "https://www.geonovum.nl/uploads/documents/nederlands_profiel_op_iso_19128_wms_1.3_-_versie_1.0.pdf",
      status: "Vastgesteld",
      publisher: "Geonovum",
      date: "2015-04-24",
      id: "NLWMS",
    },
    OaMt1: {
      title: "OGC Timeseries Profile of Observations and Measurements v1.0",
      href: "http://docs.opengeospatial.org/is/15-043r3/15-043r3.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["James Tomkins", "Dominic Lowe"],
      id: "OaMt1",
    },
    OaMx2: {
      title: "Observations and Measurements - XML Implementation v2.0",
      href: "https://portal.ogc.org/files/?artifact_id=41510",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Simon Cox"],
      id: "OaMx2",
    },
    OAPIC: {
      title: "OGC 19-087: OGC API - Coverages - Part 1: Core, version 0.0.6",
      href: "http://docs.ogc.org/DRAFTS/19-087.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Charles Heazel", "Jerome St-Louis"],
      id: "OAPIC",
    },
    OAPIEDR: {
      title:
        "OGC 19-086r5: OGC API - Environmental Data Retrieval Standard, Version 1.0.1",
      href: "https://docs.ogc.org/is/19-086r5/19-086r5.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: [
        "Mark Burgoyne",
        "David Blodgett",
        "Charles Heazel",
        "Chris Little",
      ],
      date: "2022-08-05",
      id: "OAPIEDR",
    },
    OAPIF1: {
      title:
        "OGC 17-069r4: OGC API - Features - Part 1: Core corrigendum, Version 1.0.1",
      href: "https://docs.opengeospatial.org/is/17-069r4/17-069r4.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: [
        "Panagiotis (Peter) A. Vretanos",
        "Clemens Portele",
        "Charles Heazel",
      ],
      date: "2022-05-11",
      id: "OAPIF1",
    },
    OAPIF2: {
      title:
        "OGC 18-058: OGC API - Features - Part 2: Coordinate Reference Systems by Reference, Version 1.0",
      href: "https://docs.opengeospatial.org/is/18-058r1/18-058r1.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Panagiotis (Peter) A. Vretanos", "Clemens Portele"],
      date: "2020-11-02",
      id: "OAPIF2",
    },
    OAPIF3: {
      title:
        "OGC 19-079r1: OGC API - Features - Part 3: Filtering, Version 1.0.0-rc1",
      href: "http://docs.ogc.org/DRAFTS/19-079r1.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Panagiotis (Peter) A. Vretanos", "Clemens Portele"],
      id: "OAPIF3",
    },
    OAPIF4: {
      title:
        "OGC 20-002: OGC API - Features - Part 4: Create, Replace, Update and Delete, Version 1.0.0 snapshot (editor's draft",
      href: "http://docs.ogc.org/DRAFTS/20-002.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Panagiotis (Peter) A. Vretanos", "Clemens Portele"],
      id: "OAPIF4",
    },
    OAPIMAPS: {
      title: "OGC 20-058: OGC API - Maps - Part 1: Core, Version 0.1.0",
      href: "http://docs.ogc.org/DRAFTS/20-058.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "Joan MasÃ³",
      date: "2022-06-06",
      id: "OAPIMAPS",
    },
    OAPIRECORDS1: {
      title: "OGC 20-224: OGC API - Records - Part 1: Core",
      href: "http://docs.ogc.org/DRAFTS/20-004.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: [
        "Panagiotis (Peter) A. Vretanos",
        "Tom Kralidis",
        "Charles Heazel",
      ],
      date: "2020-01-13",
      id: "OAPIRECORDS1",
    },
    OAPISTYLES: {
      title: "OGC 20-009: OGC API Styles",
      href: "http://docs.opengeospatial.org/DRAFTS/20-009.html",
      status: "Draft",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "C. Portele",
      id: "OAPISTYLES",
    },
    OAPITILES1: {
      title: "OGC 20-057: OGC API - Tiles - Part 1: Core",
      href: "https://docs.ogc.org/is/20-057/20-057.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Joan MasÃ³", "JÃ©rÃ´me St-Louis"],
      date: "26-08-2022",
      id: "OAPITILES1",
    },
    OMS3: {
      title:
        "OGC Abstract Specification Topic 20: Observations, measurements and samples v3.0.0",
      href: "https://docs.ogc.org/as/20-082r4/20-082r4.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Katharina Schleidt", "Ilkka Rinne"],
      date: "2023-05-26",
      id: "OMS3",
    },
    OREFCO: {
      title: "OGC Abstract Specification Topic 2: Referencing by coordinates",
      href: "http://docs.opengeospatial.org/as/18-005r4/18-005r4.html",
      status: "OGCÂ® Publicly Available Standard",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Roger Lott"],
      date: "2019-02-08",
      id: "OREFCO",
    },
    SE11: {
      title:
        "OGC 05-077r4: OpenGIS Symbology Encoding Implementation Specification, version 1.1",
      href: "https://portal.ogc.org/files/?artifact_id=16700",
      status: "Final version",
      publisher: "Open Geospatial Consortium (OGC)",
      date: "2006-07-21",
      id: "SE11",
    },
    SensorML: {
      title: "OGC SensorML: Model and XML Encoding Standard v2.1",
      href: "http://docs.ogc.org/is/12-000r2/12-000r2.html",
      status: "Published",
      publisher: "Open Geospatial Consortium",
      editors: ["Mike Botts", "Alexandre Robin", "Eric Hirschorn"],
      date: "2020-08-10",
      id: "SensorML",
    },
    SLD11: {
      title:
        "OGC 05-078r4: Styled Layer Descriptor profile of the Web Map Service Implementation Specification, Version 1.1",
      href: "http://portal.opengeospatial.org/files/?artifact_id=22364",
      status: "Final version",
      publisher: "Open Geospatial Consortium (OGC)",
      date: "2007-06-29",
      id: "SLD11",
    },
    STAS: {
      title: "OGC 18-088: OGC SensorThings API Part 1 - Sensing, Version 1.1",
      href: "https://docs.ogc.org/is/18-088/18-088.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Steve Liang", "Tania Khalafbeigi", "Hylke van der Schaaf"],
      date: "2021-08-04",
      id: "STAS",
    },
    STAT: {
      title:
        "OGC 17-079r1: OGC SensorThings API Part 1 - Tasking Core, Version 1.0",
      href: "http://docs.opengeospatial.org/is/17-079r1/17-079r1.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: ["Steve Liang", "Tania Khalafbeigi"],
      date: "2019-01-08",
      id: "STAT",
    },
    WCS21: {
      title:
        "OGC 17-089r1: OGC Web Coverage Service (WCS) 2.1 Interface Standard - Core",
      href: "http://docs.opengeospatial.org/is/17-089r1/17-089r1.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      date: "2018-08-16",
      id: "WCS21",
    },
    WFS11: {
      title:
        "Web Feature Service Implementation Specification with Corrigendum, Version 1.1.3",
      href: "http://docs.opengeospatial.org/is/04-094r1/04-094r1.html",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "Panagiotis A. Vretanos",
      date: "2016-10-26",
      id: "WFS11",
    },
    WMC11: {
      title:
        "OpenGIS 05-005: Web Map Context Documents Implementation Specification, version 1.1",
      href: "https://portal.ogc.org/files/?artifact_id=8618",
      status: "Adopted specification",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "J. Sonnet",
      date: "2005-01-19",
      id: "WMC11",
    },
    WMCC11: {
      title:
        "OpenGIS 08-050: Corrigendum for OpenGIS Implementation Standard Web Map Context Documents - Corrigendum 1",
      href: "https://portal.ogc.org/files/?artifact_id=27286",
      status: "Approved",
      publisher: "Open Geospatial Consortium (OGC)",
      editors: "T. Kralidis",
      date: "2008-03-14",
      id: "WMCC11",
    }
  }
}


// function prependSectionToBodyAndCreateIfNotExists(document, sectionId) {
//   let section = document.getElementById(sectionId);
//   if (section === null) {
//     section = document.createElement('section');
//     section.id = sectionId;
//   }
//   section.classList.add('introductory');
//   document.body.prepend(section);
// }

function missingOrIsEmpty(items) {
  return items === undefined || items.length === 0;
}

/**
 * Laad Respec met een `localConfig`, waarbij default waarden uit een
 * `organisationConfig` object komen. Tevens worden de `localBiblio`
 * waarden van beide objecten gecombineerd, mocht de standaard specifieke
 * bibliografie referenties nodig hebben die niet ergens anders nodig zijn.
 *
 * In de `index.html` moet het volgende staan:
 *
 * ```html
 * <script class="remove" type="module" src="js/config.mjs"></script>
 * ```
 *
 * In `js/config.mjs` moet het volgende staan:
 *
 * ```js
 * import { loadRespecWithConfiguration } from "https://tools.geostandaarden.nl/respec/config/geonovum-config.mjs";
 *
 * loadRespecWithConfiguration({
 *   <Zet de standaard specifieke configuratie hier>
 * });
 * ```
 *
 * @param {*} localConfig Configuratie specifiek voor deze standaard
 */
export function loadRespecWithConfiguration(localConfig) {
  const respecConfig = {
    ...organisationConfig,
    ...localConfig,
  };

  respecConfig.localBiblio = {
    ...organisationConfig.localBiblio,
    ...localConfig.localBiblio,
  };

  respecConfig.preProcess = [
    ...(localConfig.preProcess || []),
    (config, document, utils) => {
      // const ACCEPTED_DOMAINS = ['api', 'bomos', 'dk', 'digimelding', 'fsc', 'ftv', 'logboek', 'notificatieservices', 'st'];
      // if (!ACCEPTED_DOMAINS.includes(config.pubDomain)) {
      //   utils.showError(`Invalid pubDomain. Must be one of ${ACCEPTED_DOMAINS}, but was "${config.pubDomain}"`);
      // }
      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(config.shortName)) {
        utils.showError(`Invalid shortName. Must be in kebab-case (only lowercase letters and potentially separated by dashes), but was "${config.shortName}"`);
      }
      if (missingOrIsEmpty(config.github)) {
        utils.showError('No github link specified in configuration.');
      }
      if (missingOrIsEmpty(config.editors)) {
        utils.showError('No editors specified in configuration.');
      }
      if (missingOrIsEmpty(config.authors)) {
        utils.showError('No authors specified in configuration.');
      }
      for (const person of [...(config.editors || []), ...(config.authors || [])]) {
        if (!('companyURL' in person)) {
          continue;
        }
        // if (person.companyURL.includes("logius.nl") && person.companyURL !== "https://www.logius.nl") {
        //   utils.showError(`companyURL of an editor/author of Logius must be "https://www.logius.nl", instead it was "${person.companyURL}"`);
        // }
        if (person.companyURL.includes("github.com")) {
          utils.showError(`companyURL of an editor/author must link to a website of an organisation (not GitHub), instead it was ${person.companyURL}`);
        }
      }
    },
    // (config, document, utils) => {
    //   if (config.specStatus.toLowerCase() !== 'cv') {
    //     return;
    //   }
    //   let email;
    //   let overleg;

    //   if (['dk', 'fsc'].includes(config.pubDomain)) {
    //     email = "digikoppeling@logius.nl";
    //     overleg = "Digikoppeling";
    //   } else if (config.pubDomain === "bomos") {
    //     email = "bomos@logius.nl";
    //     overleg = "BOMOS-klankbord";
    //   } else {
    //     email = "api@logius.nl";

    //     if (config.pubDomain === "notificatieservices") {
    //       overleg = "Notificeren";
    //     } else if (config.pubDomain === "logboek") {
    //       overleg = "LDV";
    //     } else if (config.shortName.startsWith("oauth") || config.shortName === "oidc") {
    //       overleg = "OAuth";
    //     } else {
    //       overleg = "API";
    //     }
    //   }

    //   for (const texts of Object.values(config.sotdText)) {
    //     texts.cv = texts.cv.replace(/\w+@logius\.nl/, email);
    //   }
    //   // Zodat het kan worden uitgelezen bij het aanmaken van de consultatie README
    //   utils.amendConfiguration({
    //     emailForConsultation: email,
    //     technischOverleg: overleg,
    //   });
    // },
    // (config, document) => {
    //   // Secties worden toegevoegd in omgekeerde volgorde. Dus de
    //   // sectie die hier als laatste staat, komt als eerste voor
    //   // in het document.
    //   prependSectionToBodyAndCreateIfNotExists(document, 'conformance');
    //   prependSectionToBodyAndCreateIfNotExists(document, 'sotd');
    // },
    (config, document, utils) => {
      if (!config.alternateFormats) {
        config.alternateFormats = [];
      }
      const pdfName = `${config.pubDomain}-${config.shortName}-${config.publishVersion}.pdf`;
      const existingFormat = config.alternateFormats.find(format => format.label.toLowerCase() === 'pdf');
      if (existingFormat) {
        if (existingFormat.uri !== pdfName) {
          utils.showError(`Invalid name for PDF format. Expected "${pdfName}", but got "${existingFormat.uri}".
            Consider removing the PDF format from 'config.alternateFormats', as it is automatically generated already.`);
        }
        return;
      }
      config.alternateFormats.push({
        label: 'PDF',
        uri: pdfName,
      });
    }
  ];

  respecConfig.postProcess = [
    ...(localConfig.postProcess || []),
    (config, document) => {
      if (!config.spellcheck) {
        return;
      }
      const removableElements = [
        // Contains author and editor names that don't match any dictionary
        document.querySelector('.head'),
        // Contain name of standards and their authors, which don't match
        // any dictionary
        document.getElementById('references'),
        ...document.getElementsByClassName('bibref'),
        ...document.querySelectorAll('[data-cite]'),
        // Any particular part of a standard that is custom and doesn't need
        // checking, such as Dutch context in an English standard
        ...document.getElementsByClassName('remove-for-spellcheck'),
      ];
      for (const element of removableElements) {
        element?.remove();
      }
    }
  ];

  globalThis.respecConfig = respecConfig;

  import("https://logius-standaarden.github.io/publicatie/respec/builds/respec-nlgov.js");
}
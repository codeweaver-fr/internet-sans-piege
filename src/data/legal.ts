export type LegalSection = "mentions" | "privacy" | "contact";

export const LEGAL_CONTENT = {
  mentions: {
    title: "Mentions légales",
    content: [
      "Internet Sans Piège est un outil de sensibilisation destiné à informer le public sur les principaux risques liés aux usages numériques et aux arnaques en ligne.",
      "Les informations présentées sur ce site sont fournies à titre informatif et ne constituent ni un avis juridique, ni un avis technique personnalisé.",
      "Le contenu du site est édité par Jérémie Garod.",
      "Contact : jeremie.garod@gmail.com",
      "Toute reproduction des contenus du site est interdite sans autorisation préalable.",
    ],
  },

  privacy: {
    title: "Données personnelles",
    content: [
      "Le formulaire proposé sur ce site permet uniquement aux personnes qui le souhaitent d'être recontactées concernant les futurs événements Internet Sans Piège.",
      "Les données collectées sont : prénom, adresse e-mail, résultat du diagnostic, niveau de vigilance obtenu et date de la demande.",
      "Ces informations sont utilisées exclusivement dans le cadre d'Internet Sans Piège.",
      "Aucune donnée n'est vendue, louée ou transmise à des organismes tiers.",
      "Les données sont conservées pendant une durée maximale de 12 mois, sauf demande de suppression avant cette échéance.",
      "Vous pouvez demander l'accès, la rectification ou la suppression de vos données à l'adresse suivante : jeremie.garod@gmail.com",
    ],
  },

  contact: {
    title: "Contact",
    content: [
      "Pour toute question concernant Internet Sans Piège, un futur atelier ou vos données personnelles, vous pouvez nous contacter par e-mail.",
      "Email : jeremie.garod@gmail.com",
    ],
  },
};
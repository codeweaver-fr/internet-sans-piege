export const QUESTIONS = [
  {
    id: 1,
    context: "Message reçu",
    image: "/images/scenarios/sms-colis.png",
    title: "Votre colis est bloqué",
    scenario:
      "Vous attendez un colis cette semaine. Un SMS vous informe que votre livraison est bloquée et qu'une action est nécessaire pour choisir une nouvelle date.",
    answers: [
      { label: "Je clique car j'attends réellement un colis", points: 0 },
      { label: "Je vérifie l'expéditeur et le lien avant d'agir", points: 10 },
      { label: "Je réponds au SMS pour demander des précisions", points: 2 },
      { label: "Je supprime le SMS sans rien vérifier", points: 5 },
    ],
  },

  {
    id: 2,
    context: "Appel entrant",
    image: "/images/scenarios/appel-banque.png",
    title: "Service sécurité",
    scenario:
      "Vous avez effectué plusieurs achats récemment. Une personne se présente comme le service sécurité de votre banque et affirme avoir détecté une opération inhabituelle.",
    answers: [
      { label: "Je donne les informations demandées", points: 0 },
      { label: "Je donne seulement une partie des informations", points: 3 },
      { label: "Je raccroche et rappelle ma banque via le numéro officiel", points: 10 },
      { label: "Je reste en ligne pour écouter ses explications", points: 2 },
    ],
  },

  {
    id: 3,
    context: "Notification",
    image: "/images/scenarios/facebook-cadeau.png",
    title: "Félicitations !",
    scenario:
      "Vous participez parfois à des jeux concours. Une notification vous annonce que vous avez été sélectionné pour recevoir gratuitement un smartphone.",
    answers: [
      { label: "Je vérifie qui organise réellement le concours", points: 10 },
      { label: "Je remplis le formulaire car le cadeau m'intéresse", points: 0 },
      { label: "Je partage l'annonce pour ne pas rater l'offre", points: 0 },
      { label: "Je regarde les commentaires avant de décider", points: 4 },
    ],
  },

  {
    id: 4,
    context: "Email reçu",
    image: "/images/scenarios/email-suspension.png",
    title: "Compte suspendu",
    scenario:
      "Vous utilisez régulièrement ce service. Un email indique que votre compte sera suspendu dans les 24 heures si vous ne confirmez pas vos informations.",
    answers: [
      { label: "Je clique car le message semble urgent", points: 0 },
      { label: "Je vais directement sur le site officiel sans utiliser le lien", points: 10 },
      { label: "Je réponds à l'email pour demander confirmation", points: 1 },
      { label: "Je transfère le mail à un proche pour avis", points: 3 },
    ],
  },

  {
    id: 5,
    context: "Email reçu",
    image: "/images/scenarios/email-edf.png",
    title: "Message important",
    scenario:
      "Vous êtes bien client chez EDF. Vous recevez un email au design professionnel avec logo officiel et demande de mise à jour de vos informations.",
    answers: [
      { label: "Je fais confiance car je suis bien client EDF", points: 0 },
      { label: "Je clique pour voir ce qui est demandé", points: 2 },
      { label: "Je contrôle l'expéditeur et les liens avant toute action", points: 10 },
      { label: "Je cherche seulement si le logo semble officiel", points: 1 },
    ],
  },

  {
    id: 6,
    context: "Alerte écran",
    image: "/images/scenarios/alerte-microsoft.png",
    title: "Ordinateur infecté",
    scenario:
      "Vous êtes sur votre ordinateur. Une fenêtre surgissante occupe tout l'écran et affirme qu'un virus a été détecté. Un numéro d'assistance est affiché.",
    answers: [
      { label: "Je ferme la fenêtre et vérifie avec mon antivirus", points: 10 },
      { label: "J'appelle le numéro affiché", points: 0 },
      { label: "Je clique sur le bouton d'analyse proposé", points: 2 },
      { label: "Je redémarre puis je vérifie calmement la situation", points: 7 },
    ],
  },

  {
    id: 7,
    context: "Message reçu",
    image: "/images/scenarios/messenger-proche.png",
    title: "Besoin urgent",
    scenario:
      "Vous recevez un message provenant du compte d'un proche. La personne explique qu'elle rencontre un problème urgent et demande une aide financière immédiate.",
    answers: [
      { label: "J'envoie l'argent car je connais cette personne", points: 0 },
      { label: "J'appelle la personne pour vérifier directement sur son téléphone", points: 10 },
      { label: "Je demande son RIB pour l'aider plus vite", points: 2 },
      { label: "Je pose une question personnelle pour vérifier son identité", points: 6 },
    ],
  },

  {
    id: 8,
    context: "Site internet",
    image: "/images/scenarios/faux-site-ameli.png",
    title: "Remboursement disponible",
    scenario:
      "Après avoir reçu un message concernant votre assurance maladie, vous arrivez sur une page indiquant qu'un remboursement est disponible et qu'une validation est nécessaire.",
    answers: [
      { label: "Je poursuis car le site ressemble au vrai", points: 0 },
      { label: "Je regarde surtout le logo et les couleurs", points: 1 },
      { label: "Je vérifie l'adresse complète du site", points: 10 },
      { label: "Je commence à remplir puis je m'arrête si on demande ma carte", points: 3 },
    ],
  },

  {
    id: 9,
    context: "QR Code",
    image: "/images/scenarios/qr-code-affiche.png",
    title: "Lien inconnu",
    scenario:
      "Vous scannez un QR Code affiché dans un lieu public. Une page internet s'ouvre immédiatement sur votre téléphone.",
    answers: [
      { label: "Je poursuis ma navigation sans vérifier", points: 0 },
      { label: "Je partage le lien à un proche pour avoir son avis", points: 2 },
      { label: "Je vérifie l'adresse du site avant d'aller plus loin", points: 10 },
      { label: "Je ferme la page si elle me demande trop d'informations", points: 6 },
    ],
  },

  {
    id: 10,
    context: "Email reçu",
    image: "/images/scenarios/email-pro.png",
    title: "Pièce jointe inattendue",
    scenario:
      "Vous recevez un email d'un collègue ou d'un contact professionnel que vous connaissez. Le message contient uniquement une pièce jointe nommée 'Facture.pdf' et aucun autre texte.",
    answers: [
      { label: "J'ouvre la pièce jointe car l'expéditeur est connu", points: 0 },
      { label: "Je réponds au message pour demander de quoi il s'agit", points: 3 },
      { label: "Je contacte la personne par un autre moyen avant d'ouvrir la pièce jointe", points: 10 },
      { label: "Je télécharge la pièce jointe mais je ne l'ouvre pas tout de suite", points: 1 },
    ],
  },

  {
    id: 11,
    context: "Connexion Wi-Fi",
    image: "/images/scenarios/wifi-gratuit.png",
    title: "Wi-Fi gratuit",
    scenario:
      "Vous êtes dans un café. Deux réseaux Wi-Fi apparaissent sur votre téléphone : 'CafeCentral' et 'CafeCentral_Free'. Vous souhaitez vous connecter pour consulter vos emails.",
    answers: [
      { label: "Je choisis le réseau avec le meilleur signal", points: 0 },
      { label: "Je teste les deux réseaux pour voir lequel fonctionne", points: 2 },
      { label: "Je demande au personnel quel est le réseau officiel", points: 10 },
      { label: "Je me connecte puis j'évite de saisir des données sensibles", points: 6 },
    ],
  },
];
// Gestion du menu déroulant pour sélectionner un thème
document.getElementById('menu-button').addEventListener('click', function() {
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'flex' : 'none';
});

// Fonction pour appliquer le thème sélectionné
const themes = [
  { id: 'theme-base', class: '' },
  { id: 'theme-dark', class: 'dark' },
  { id: 'theme-futuriste', class: 'futuriste' },
  { id: 'theme-retro', class: 'retro' },
  { id: 'theme-vintage', class: 'vintage' },
  { id: 'theme-rose', class: 'rose' },
  { id: 'theme-ocean', class: 'ocean' },
  { id: 'theme-sunset', class: 'sunset' },
  { id: 'theme-forest', class: 'forest' },
  { id: 'theme-desert', class: 'desert' },
  { id: 'theme-night', class: 'night' },
  { id: 'theme-morning', class: 'morning' },
  { id: 'theme-winter', class: 'winter' },
  { id: 'theme-spring', class: 'spring' },
  { id: 'theme-autumn', class: 'autumn' }
];

themes.forEach(theme => {
  document.getElementById(theme.id).addEventListener('click', function() {
    document.body.className = theme.class;
    localStorage.setItem('theme', theme.class);
    document.getElementById('dropdown-menu').style.display = 'none'; // Cache le menu après sélection
  });
});

// Appliquer le thème sauvegardé au chargement de la page
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.className = savedTheme;
  }
});

// ------------------------------ Gestion des Sites ------------------------------

const sitesPrincipaux = [
  { nom: "Animés", url: "https://anime-sama.fr/", type: "anime" },
  { nom: "Films & Séries", url: "https://moviesvn.net/", type: "films" },
  { nom: "TV", url: "https://fstv.fun/", type: "autre" },
  { nom: "Jeux", url: "https://a6023.wordpress.com/", type: "autre" }
];

const secoursAnime = [
  "https://french-anime.com/",
  "https://v6.voiranime.com/"
];

const secoursFilms = [
  "https://www.french-stream.al/",
  "https://monstream.blue/zeus-films/",
  "https://en.yts-official.mx/browse-movies",
  "https://moviqa.com/"
];

const refreshInterval = 1000 * 60 * 60; // 1 heure

function afficherSites() {
  const container = document.getElementById('sites-container');
  container.innerHTML = '';

  sitesPrincipaux.forEach((site, index) => {
    const div = document.createElement('div');
    div.className = 'site-block';

    const button = document.createElement('button');
    button.innerText = site.nom;
    button.onclick = () => window.open(site.url, '_blank');
    button.id = `site-${index}`;

    div.appendChild(button);
    container.appendChild(div);

    verifierSite(site, button, index);
  });
}

async function verifierSite(site, button, index) {
  try {
    const response = await fetch(site.url, { method: 'HEAD', mode: 'no-cors' });
  } catch (error) {
    console.log(`Site down: ${site.nom}`);
    let secoursList = [];
    if (site.type === "anime") secoursList = secoursAnime;
    if (site.type === "films") secoursList = secoursFilms;

    let remplacementTrouve = false;
    for (const secours of secoursList) {
      try {
        await fetch(secours, { method: 'HEAD', mode: 'no-cors' });
        sitesPrincipaux[index].url = secours;
        button.onclick = () => window.open(secours, '_blank');
        button.innerText = site.nom + ".";
        remplacementTrouve = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!remplacementTrouve) {
      button.innerText = site.nom + " (indisponible)";
      button.disabled = true;
    }
  }
}

function bouclePrincipale() {
  afficherSites();
  setInterval(afficherSites, refreshInterval);
}

bouclePrincipale();

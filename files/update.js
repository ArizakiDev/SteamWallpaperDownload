const request = require('request');
const fs = require('fs');

const packageJsonUrl = 'https://raw.githubusercontent.com/ArizakiDev/SteamWallpaperDownload/main/package.json';
const indexJsUrl = 'https://raw.githubusercontent.com/ArizakiDev/SteamWallpaperDownload/main/index.js';
const packageJsonPath = './package.json'; 
const indexJsPath = './files/index.js';

const checkForUpdates = () => {
  request(packageJsonUrl, (error, response, body) => {
    if (error) {
      console.error('\x1b[31m' + '\nUne erreur s\'est produite lors de la vérification des mises à jour :', error + '\x1b[0m');
      return;
    }

    if (response.statusCode !== 200) {
      console.error('\x1b[31m' +  '\nLa requête de vérification des mises à jour a retourné une réponse non valide :', response.statusCode + '\x1b[0m');
      return;
    }

    const packageJsonData = JSON.parse(body);

    fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('\x1b[31m' +  '\nUne erreur s\'est produite lors de la lecture du fichier package.json :', err + '\x1b[0m');
        return;
      }

      const currentPackageJson = JSON.parse(data);

      if (currentPackageJson.version !== packageJsonData.version) {
        console.log('\x1b[33m' + '\nUne nouvelle version est disponible. Téléchargement en cours...' + '\x1b[0m');

        request(indexJsUrl, (err, res, body) => {
          if (err) {
            console.error('\x1b[31m' +  '\nUne erreur s\'est produite lors du téléchargement de la mise à jour :', err  + '\x1b[0m');
            return;
          }

          if (res.statusCode !== 200) {
            console.error('\x1b[31m' +  '\nLa requête de téléchargement de la mise à jour a retourné une réponse non valide :', res.statusCode + '\x1b[0m');
            return;
          }

          fs.writeFile(indexJsPath, body, 'utf-8', (error) => {
            if (error) {
              console.error('\x1b[31m' +  '\nUne erreur s\'est produite lors de l\'écriture du fichier index.js :', error + '\x1b[0m');
              return;
            }

            console.log('\x1b[32m' + '\nMise à jour effectuée avec succès.' + '\x1b[0m');

            // Mettre à jour le fichier package.json
            fs.writeFile(packageJsonPath, JSON.stringify(packageJsonData, null, 2), 'utf-8', (error) => {
              if (error) {
                console.error('\x1b[31m' + '\nUne erreur s\'est produite lors de la mise à jour du fichier package.json :', error + '\x1b[0m');
                return;
              }

              console.log('\x1b[32m' + '\nLe fichier package.json a été mis à jour.' + '\x1b[0m');

              // Redémarrer le script (facultatif)
              console.log('\x1b[36m' + '\nRedémarrage du script...' + '\x1b[0m');
              // process.exit(); // Décommentez cette ligne si vous souhaitez que le script se redémarre après la mise à jour
            });
          });
        });
      } else {
        console.log('\x1b[34m' + '\nLe script est à jour. Aucune mise à jour disponible.' + '\x1b[0m');
      }
    });
  });
};

checkForUpdates();

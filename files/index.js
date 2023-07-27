const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showCenteredMessage(message, color) {
    const width = process.stdout.columns;
    const padding = Math.floor((width - message.length) / 2);
    console.log(`${color}${' '.repeat(padding)}${message}${' '.repeat(padding)}\x1b[0m`);
  }

function showMenu() {
  console.clear();
console.log("");
console.log("");
  showCenteredMessage("[+] Author: Arizaki.xyz", "\x1b[33m");
  showCenteredMessage("[+] Version: 1.0", "\x1b[33m");
  showCenteredMessage("[+] Language English", "\x1b[33m");
  showCenteredMessage("[-] Check on website: https://zephyr.cyclic.app/", "\x1b[31m");
  console.log('')
  showCenteredMessage("[?] Please choice your option", "\x1b[31m");
  console.log("\x1b[31m1. Download a steam wallpaper");
  console.log("\x1b[31m2. Check a new version");
  console.log("\x1b[31m3. Change language");
  console.log("\x1b[31m4. Install all modules");
  console.log("\x1b[31m5. Download Wallpaper Engine");
  console.log('')
  console.log("\x1b[36m6. How to download a wallpaper ?");
  console.log('')
  showCenteredMessage("[?] Other infos", "\x1b[31m");
  console.log("\x1b[34m[Discord]");
  console.log("\x1b[31m[Website]");
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function menu() {
  while (true) {
    showMenu();

    const choice = await askQuestion("\x1b[92mChoose an option (1-6), or press any other key to exit: ");

    switch (choice) {
      case '1':
        exec('start arizaki.bat');
        break;
      case '2':
        console.log("checking a new version..");
        exec('node update.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
          }
        });
        break;
      case '3':
        console.log("go on website..");
        exec('start https://wedownload.vercel.app');
        break;
        case '4':
          console.log("install..");
          exec('start installation.bat');
          break;
          case '5':
            exec('start https://zephyr.cyclic.app/');
            break;

        case 'discord':
          console.log("join discord..");
          exec('start https://discord.gg/ybfSC9X5HQ');
          break;

          case 'website':
            console.log("join website..");
            exec('start https://zephyr.cyclic.app/');
            break;
      default:
        console.log("Exiting...");
        process.exit();
    }

    await askQuestion("\x1b[92mPress Enter to return to the menu...");
  }
}

menu();


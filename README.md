# DietApplication CZ
## Navržená architektura projektu
<img src="https://github.com/baiukov/DietApplication/assets/57836519/1336fa41-1b91-4295-ac8d-7fddaff5c482" width="1080">

## Návod na nastavení back-end serveru

- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku ```dietAplication_backend``` jako Java Spring projekt v libovolném IDE
- Pokud se SDK nenastaví automaticky, je potřeba ho nastavit na verzi Java 17
- Do terminálu IDE zadejte ve složce příkaz ```mvn clean package``` pro stáhování potřebných knihoven a vytvoření aktualního buildu
- Dále je zapotřebí nastavit databázový MySQL server na lokálním IP (localhost) na portu 3306, je možné využit libovolný, doporučuji [Wampserver](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.3.2_x64.exe/download)
- Spusťte server:
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/8d03a10e-823a-4bf8-8bd0-b0bef094b41c" width="400">

- PHPMyAdmin GUI pro databáze se otevře v pohlížeči, vytvořte novou databázi ```dietdb```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/10c27fe7-a841-42b3-b32d-bbffc8b9c7ef" width="600">

- Pak je možné spustít back-end server v IDE. Mělo by všechno nastartovat správně

## Návod na nastavení Kotlin aplikace
- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku ```dietAplication_app``` jako Java Spring projekt v libovolném IDE
- IDE se zeptá na povolení stáhování potřebných knihoven pomocí gradle a plaginů, je potřeba to povolit. Potrvá to nějakou dobu, je nutné počkat, až se to stáhne, sledovat je možné v dolním panelu IDE.
- Může se stát, že se vyskytne chyba verze AGP (používáme 8.0.0), je nutné aktualizovat verzi IDE.
- Stáhněte Android Plugin pro IDE (v IntelliJ IDEA přejděte do souboru ```AndroidManifest.xml``` a v horním panelu IDE Vám nabidne stažení příslušných plaginů
- Restartujte po těch úpravách IDE, a aplikace by už měla být spustitelná
- Pro spuštění je ale nutné nastavit zařízení. V pravém panelu klikněte na DeviceManager. Pak přídejte nové zařízení. Nejlepší volba je ```Resizable API 34```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/c45c41c6-3809-483d-8cda-0a0022dba15e" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/524e9251-c1ae-4032-9176-964f4d642b72" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/f1b390f0-1ef7-474a-bd5c-afaae23bffdf" width="350">
 
- Jako systémový obrázek je možné vybrat jakýkoliv, hlávně aby podporoval API verzi 34. Například, ```UpsideDownCake v34```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/6be272c8-f0b8-4419-9bef-b4889e668481" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/5a562681-d9f9-4a00-93de-67d29fa2ce5d" width="350">
 
- Pak je možné emulátor vybrat a aplikaci nastartovat. Měla by se zobrazit na emulátoru v pravé částí IDE
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/6543afc3-1655-4121-8f4f-902946aea09b" width="600">

## Návod na nastavení Frontend serveru
- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku ```dietAplication_frontend``` jako projekt v libovolném IDE
- Otevřte terminál a zadejte příkaz ```npm install``` pro stažení potřebných knihoven. Chvílku to potrvá
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/21dd49fb-b490-436a-8046-30771bb39723" width="400">

- Pokud nemáte v levém panelu položku NPM Scripts, přidejte ji pomocí menu
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/d7cc6797-fb92-4182-9891-6115bbfa39b4" width="400">

- Skripta jsou:
  - minify - minifikace (komprimace) javasriptového kódu pro stránku. Dělá se jednou a naposled
  - watch - přeloží typescriptový kód do javascriptového. Spustí se jenom jednou a pak hlídá změny v kódě
- Pro spuštění aplikace je nutné využit nějaký lokální server. Je možné nato využit plugin pro VS Code ```Live Server```. Stáhněte si ho, nainstalujte a pak v dolním menu je tlačitko pro spuštění serveru, který taky bude hlídat změny
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/d79bfe5a-eb65-4cd6-8356-b4bcff7cc336" width="600">

### Po instalovaní všech tří prvků aplikací je možné ji spustit a ověřit funkčnost

# DietApplication ENG
## Designed project architecture
<img src="https://github.com/baiukov/DietApplication/assets/57836519/a80046bc-bef8-49fb-aebf-9a33bf0e943f" width="1080">

## Back-end server setup guide

- Clone and fetch repository to a local git system
- Open folder ```dietAplication_backend``` as a Java Spring project in any IDE
- If a SDK isn't set up, you need to set a Java 17 version manually
- Type in a terminal command ```mvn clean package``` for downloading neccessary libriaries and generating current build
- Then you need to set up database MySQL server on the local IP (localhost) on the port 3306, you can choose any programmes to do it, I advise [Wampserver](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.3.2_x64.exe/download)
- Start server:
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/8d03a10e-823a-4bf8-8bd0-b0bef094b41c" width="400">

- PHPMyAdmin GUI for database will open in your browser, then create new database ```dietdb```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/10c27fe7-a841-42b3-b32d-bbffc8b9c7ef" width="600">

- Then you will be able to start back-end server in your IDE. It should start correctly

## Kotlin application setup guide

- Clone and fetch repository to a local git system
- Open folder ```dietAplication_app``` as a Java Spring project in any IDE
- IDE will ask you about a permition for downloading required libraries using gradle and plug-ins, you should allow it. It will take some time, you can watch the process in the bottom menu of IDE
- It might happen, that error about AGP version (we use 8.0.0) appears. You should update your IDE version.
- Download Android Plugin for IDE (in IntelliJ IDEA go to file ```AndroidManifest.xml``` and in top menu IDE will offer you downloading relevant plugins
- Restart after that IDE and application is supposed to be runnable
- For starting you should set up device. In right panel click on DeviceManager. Then add new device. A good option is ```Resizable API 34```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/c45c41c6-3809-483d-8cda-0a0022dba15e" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/524e9251-c1ae-4032-9176-964f4d642b72" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/f1b390f0-1ef7-474a-bd5c-afaae23bffdf" width="350">

- As a system image you may choose anyone, mainly that it supports version 34 API. For example, ```UpsideDownCake v34```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/6be272c8-f0b8-4419-9bef-b4889e668481" width="350">
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/5a562681-d9f9-4a00-93de-67d29fa2ce5d" width="350">

- Then you can choose Android emulator and start application. It is supposed to be shown in emulator in right side of IDE
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/6543afc3-1655-4121-8f4f-902946aea09b" width="600">

## Front-end server setup guide

- Clone and fetch repository to a local git system
- Open folder ```dietAplication_frontend``` as a project in any IDE
- Open terminal and type in command ```npm install``` for installing required libraries. It will take some time
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/21dd49fb-b490-436a-8046-30771bb39723" width="400">

- If you don't have in the left panel item NPM Scripts, add it using menu
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/d7cc6797-fb92-4182-9891-6115bbfa39b4" width="400">

- Scripts are:
  - minify - minification (comprimation) javascript code for page. You should run it once at the end
  - watch - transpile typescript code to javascript. You may start it once and it will watch your changes
- For starting application it's neccessary to use some local webserver. You can use plug-in for VS code named ```Live Server```. Download it, install and then in bottom menu, there is button for server starting, which will watch changes
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/d79bfe5a-eb65-4cd6-8356-b4bcff7cc336" width="600">

### After installing all three elements of application, it is possible to start it and check functionality

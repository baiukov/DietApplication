# DietApplication

## Návod na nastavení back-end serveru
- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku ```dietAplication_backend``` jako Java Spring projekt v libovolném IDE
- Pokud se SDK nenastaví automaticky, je potřeba ho nastavit na verzi Java 17
- Do terminálu IDE zadejte ve složce příkaz ```mvn clean package``` pro stahování potřebných knihoven a vytvoření aktualního buildu
- Dále je zapotřebí nastavit databázový MySQL server na lokálním IP (localhost) na portu 3306, je možné využit libovolný, doporučuji [Wampserver](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.3.2_x64.exe/download)
- Spusťte server:
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/8d03a10e-823a-4bf8-8bd0-b0bef094b41c" width="400">

- PHPMyAdmin GUI pro databáze se otevře v pohlížeči, vytvořte novou databázi ```dietdb```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/10c27fe7-a841-42b3-b32d-bbffc8b9c7ef" width="600">

- Pak je možné spustít back-end server v IDE. Mělo by všechno nastartovat správně

## Návod na nastavení Kotlin aplikace
- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku ```dietAplication_app``` jako Java Spring projekt v libovolném IDE
- IDE se zeptá na povolení stahování potřebných knihoven pomocí gradle a plaginů, je potřeba to povolit. Potrvá to nějakou dobu, je nutné počkat, až se to stahne, sledovat je možné v dolním panelu IDE.
- Může se stát, že se vyskytne chyba verze AGP (používáme 8.0.0), je nutné aktualizovat verzi IDE.
- Stahněte Android Plugin pro IDE (v IntelliJ IDEA přejděte do souboru ```AndroidManifest.xml``` a v horním panelu IDE Vám nabidne stažení příslušných plaginů
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



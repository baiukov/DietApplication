# DietApplication

## Návod na nastavení back-end serveru
- Nakopírujte a načtěte si repositář do lokálního gitu
- Otevřte složku "dietAplication_backend" jako Java Spring projekt v libovolném IDE
- Pokud se SDK nenastaví automaticky, je potřeba ho nastavit na verzi Java 17
- Do terminálu IDE zadejte ve složce příkaz ```mvn clean package``` pro stahování potřebných knihoven a vytvoření aktualního buildu
- Dále je zapotřebí nastavit databázový MySQL server na lokálním IP (localhost) na portu 3306, je možné využit libovolný, doporučuji [Wampserver](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/wampserver3.3.2_x64.exe/download)
- Spusťte server:
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/8d03a10e-823a-4bf8-8bd0-b0bef094b41c" width="400">

 
- PHPMyAdmin GUI pro databáze se otevře v pohlížeči, vytvořte novou databázi ```dietdb```
 <img src="https://github.com/baiukov/DietApplication/assets/57836519/10c27fe7-a841-42b3-b32d-bbffc8b9c7ef" width="600">



- Pak je možné spustít back-end server v IDE. Mělo by všechno nastartovat správně

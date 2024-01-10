# Krátký návod Jak pracovat s TypeScript a architekturou MVC (Model View Controller)

Použítí těchto dvou technologií ve frontendové částí projektu je velmi zásadní věc. Dělá to kód více čítelným, jasným, strukturuovaným, znovu použítelným, škalovatelným a čístým, zabraňuje to hodně chyb za běhu aplikace. 

Syntaxe typescriptu je skoro stejná jako v JS, ale nutí k nastavování typizace proměnných a přínáší úžitečné OOP věci (enumy, rozhrání, abstraktní třídy atd.).
Jak je populární TS:
![image](https://leanylabs.com/static/02ff5ba0a38fbb029a79f858497c1773/bcd01/octoverse.png)


1. Po nakopírování kódu do lokánlního repositáře, vytvořte si vlastní větev 
- ```git branch branch_name```
- ```git checkout branch_name```
- nebo pomocí GUI

![image](https://i.imgur.com/L7YB37I.png)

2. Pro příklad vytvoříme balíček pro zpracování uživatelů.
3. Nejdřív vytvořte HTML, CSS běžným způsobem pro statickou stránku.
4. Ke zpracování logiky vytvořte složku do složky ```dev``` s názvem balíčku. V našem případě s názvem ```user```
![image](https://i.imgur.com/8o1G3V1.png)
6. Jelikož projekt je postaven na architektonickém vzoru MVC, je potřeba vytvořit 3 soubory pro podporu této struktury.
![image](https://i.imgur.com/pEs7aUC.png)
   - ```user.service.ts``` - služba pro zpracování logiky uživatelů. Všechna potřebna logika a metody pro jeji zpracování se nachází v jednom míste, resp. tady.
   - ```user.controller.ts``` - správce událostí uživatelů. Obsahuje všechna příjetí volání (událostí) z jiných modulů a ze serveru.
   - ```user.module.ts``` - nastavení modulu. Nastaví se správce a službu modulu.
   (při dalším vývoji místo "user" se použíje název dalšího modulu)
7. Jelikož používáme objektově orientované programování, budeme vytvářet třídy.
8. Za prvé, založte třídu služby, proto do souboru ```user.service.ts``` napíšeme kód ```export class UserService { }```
   - ```export``` - znamená, že třída bude volně dostupná pro celý modul aplikace
   - ```class``` - klíčové slovo pro vytvoření třídy
   - ```UserService``` - název třídy
   - ```{ }``` - rozsah působení třídy tzv. scope, do kterého se pak nacpou metody a proměnné třídy
   ![image](https://i.imgur.com/TlyXXAW.png)
  Pro příklad jsem přídal proměnnou s jménem uživatele a pár metod, může tu být jakékoliv objekty pro práci s logikou
9. Za druhé, vytvořte správce této služby. Vytvoření třídy je stejné, jenže název teď bude ```UserController```
    ```constructor() {}``` - je metoda pro konstruování instance třídy. Do ```()``` předaváme proměnné, ```{}``` scope této metody.
   Pokaždé potřebujeme do konstruktoru zadat nastavení proměnný služby, se kterou pak bude probíhat komunikace
    ![image](https://i.imgur.com/0RiqZHt.png)
   Pro příklad je nastavená proměnná userService a deklaruje se v konstruktoru
10. Za třetí vytvořte třídu modulu pro vytváření instancí předchazejících tříd. Tato třída je pro každý modul v podstatě stejná, mění se jenom názvy instancí a tříd.
  ![image](https://i.imgur.com/KZNNDdX.png)
11. Pokud je potřeba vytváře dynamicky nějaké grafické prvky, je dobré vytvořit další soubour ```user.view.ts``` a do něj třídu ```UserView``` a psát kód těch prvků do této třídy. Pak je kód líp čítelný
12. Přídejte nově vytvořený modul k aplikaci. Proto v modulu aplikace ```app.module.ts``` souboru vytvořte instance nové třídy modulu
  ```new UserModule()```
    ![image](https://i.imgur.com/qLcXWoD.png)
13. Teď zaregistujeme si poslouhač volání tohoto eventu v správci uživatelů.
    Metoda ```on``` povolí tuto registraci, první parametr je název události, druhý je metoda, která bude vyvolaná (vždycky ze služby) 
   ![image](https://github.com/baiukov/DietApplication/assets/57836519/a6485f6b-c3b5-4894-b6e9-73bf5d39fdc1)

14. Vyvoláme tuto událost z jiného balíčku. V nějaké jiné služby pomocí metody ```emit``` první parametr je název, druhý jsou data nadefinovaná v registrace eventu (pozor na typy!)
![image](https://github.com/baiukov/DietApplication/assets/57836519/a418c5d1-a396-4cfb-b86d-c6045b818234)


15. Založíme komunikaci mezi moduly aplikace. Nejdřív vytvořte název eventu ve třídě ```Events```:
    ![image](https://i.imgur.com/wvT0f6v.png) 

16. Pro vybudování projektu spusťte NPM Script ```watch```, který přeloží TS kód do JS pro prohlížeč a bude hlídat následující změny v kódě a při změně budovat automaticky
![image](https://i.imgur.com/wklGxLn.png)

17. Pro rychlejší přenos scriptů používáme minifikaci (komprimaci), spusťte ji pomocí NPM Scriptu ```minify```. Ten přeloží kód do přenositelné verze
   ![image](https://i.imgur.com/oGC154T.png)

 TypeScript je striktně typovaný programovácí jazyk, proto je potřeba po inicializaci proměnné uvést vždycky její typ
 Některé užitečné typy:
 - ```any``` - pokud nevíme který typ to bude, můžeme zadat tento typ
 - ```number``` - jakékoliv číslo
 - ```string``` - textový řádek
 - ```boolean``` - true nebo false
 - ```Function``` - metoda
 - ```Array<string>``` - pole obsahující textové řádky
 - ```Record<string, number>``` - záznam v podobě klíč/hodnota, kde klíč je řádek a hodnota je číslo
 - ```UserService``` - můžeme využít i námi vytvořený typ, resp. třídu
 - ```undefined``` - tato proměnná nebyla nadefinovaná a její hodnota je neznamá
 - ```null``` - tato proměnná byla nadefinovaná, ale její hodnota je neznamá
 
 Případ použítí: ```const myVariable: number = 24```
 
 

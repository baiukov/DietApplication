# Krátký návod Jak pracovat s TypeScript a architekturou MVC (Model View Controller)

1. Po nakopírování kódu do lokánlního repositáře, vytvořte si vlastní větev 
```git branch my_best_branch```
```git checkout my_best_branch```
nebo pomocí GUI

![image](https://github.com/baiukov/roleplay/assets/57836519/ebaa635a-f85a-4764-bd1e-de1a1ac3109a)

2. Pro příklad vytvoříme balíček pro zpracování uživatelů.
3. Nejdřív vytvořte HTML, CSS běžným způsobem pro statickou stránku.
4. Ke zpracování logiky vytvořte složku do složky ```dev``` s názvem balíčku. V našem případě s názvem ```user```
![image](https://github.com/baiukov/roleplay/assets/57836519/5af5b84f-ad2c-4294-a67c-ed15c0b757dc)
6. Jelikož projekt je postaven na architektonickém vzoru MVC, je potřeba vytvořit 3 soubory pro podporu tyto struktury.
![image](https://github.com/baiukov/roleplay/assets/57836519/87ea4cf7-cd5f-4eea-9b12-b7814d187fe2)
   - ```user.service.ts``` - služba pro zpracování logiky uživatelů. Všechna potřebna logika a metody pro jeji zpracování se nachází v jednom míste, resp. tady.
   - ```user.controller.ts``` - správce událostí uživatelů. Obsahuje všechna příjetí volání (událostí) z jiných modulů a ze serveru.
   - ```user.module.ts``` - nastavení modulu. Nastaví se správce a službu modulu.
   (při dalším vývoji místo "user" se použíje název dalšího modulu)
7. Jelikož používáme objektově orientované programování, budeme vytvářet třídy.
8. Za prvé, si založte třídu služby, proto do souboru ```user.service.ts``` napíšeme kód
   ```export class UserService { }```
   ```export``` - znamená, že třída bude volně dostupná pro celý modul aplikace
   ```class``` - klíčové slovo pro vytvoření třídy
   ```UserService``` - název třídy
   ```{ }``` - rozsah působení třídy tzv. scope, do kterého se pak nacpou metody a proměnné třídy
   ![image](https://github.com/baiukov/roleplay/assets/57836519/9c489128-a390-46bc-8f11-7e7a0ed7378b)
  Pro příklad jsem přídal proměnnou s jménem uživatele a pár metod, může tu být jakékoliv objekty pro práci s logikou
9. Za druhé, vytvořte správce této služby. Vytvoření třídy je stejné, jenže název teď bude ```UserController```
    ```constructor() {}``` - je metoda pro konstruování instance třídy. Do ```()``` předaváme proměnné, ```{}``` scope této metody.
   Pokaždé potřebujeme do konstruktoru zadat nastavení proměnný služby, se kterou pak bude probíhat komunikace
    ![image](https://github.com/baiukov/roleplay/assets/57836519/a60cb1cd-f5af-4cda-b8af-332327605ace)
   Pro příklad je nastavená proměnná userService a deklaruje se v konstruktoru
10. Za třetí vytvořte třídu modulu pro vytváření instancí předchazejících tříd. Tato třída je pro každý modul v podstatě stejná, mění se jenom názvy instancí a tříd.
  ![image](https://github.com/baiukov/roleplay/assets/57836519/ba8330cd-f04d-4d73-bee6-0073cbee2bfb)
11. Pokud je potřeba vytváře dynamicky nějaké grafické prvky, je dobré vytvořit další soubour ```user.view.ts``` a do něj třídu ```UserView``` a psát kód těch prvků do této třídy. Pak je kód líp čítelný
12. Přídejte nově vytvořený modul k aplikaci. Proto v modulu aplikace ```app.module.ts``` souboru vytvořte instance nové třídy modulu
  ```new UserModule()```
    ![image](https://github.com/baiukov/roleplay/assets/57836519/be98cd06-26e8-49c8-8591-c8828f05cab2)

13. Pro vybudování projektu spusťte NPM Script ```watch```, který přeloží TS kód do JS pro prohlížeč a bude hlídat následující změny v kódě a při změně budovat automaticky
![image](https://github.com/baiukov/roleplay/assets/57836519/4de1e87e-b039-42cf-bebf-be2003036ce3)

15. Pro rychlejší přenos scriptů používáme minifikaci (komprimaci), spusťte ji pomocí NPM Scriptu ```minify```. Ten přeloží kód do přenositelné verze
   ![image](https://github.com/baiukov/roleplay/assets/57836519/ca07cbe2-b742-4f59-8097-9b622151b090)

 TypeScript je striktně typovaný programovácí jazyk, proto je potřeba po inicializaci proměnné uvést vždycky její typ
 Některé užitečné typy:
 ```any``` - pokud nevíme který typ to bude, můžeme zadat tento typ
 ```number``` - jakékoliv číslo
 ```string``` - textový řádek
 ```boolean``` - true nebo false
 ```Function``` - metoda
 ```Array<string>``` - pole obsahující textové řádky
 ```Record<string, number>``` - záznam v podobě klíč/hodnota, kde klíč je řádek a hodnota je číslo
 ```UserService``` - můžeme využít i námi vytvořený typ, resp. třídu
 ```undefined``` - tato proměnná nebyla nadefinovaná a její hodnota je neznamá
 ```null``` - tato proměnná byla nadefinovaná, ale její hodnota je neznamá
 Případ použítí: ```const myVariable: number = 24```
 
 

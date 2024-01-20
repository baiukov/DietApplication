package vse.team.dietapplication_backend.user;

import java.util.List;

/*
 * Třída UserDataRequest - je třída parsování příjatých z aplikace dat uživatele.
 * Jelikož v JS jsou data zabalována pomocí JSON, není možné přímo naparsovat je do
 * Javy, proto tato třídy nastaví pravidla parsování těchto dat
 *
 * @author Aleksei Baiukov
 */
public class UserDataRequest {

    // nastaví pravidlo, že získána data jsou v podbě kolekce řádku
    private List<String> data;

    // Gettery
    public List<String> getData() {
        return data;
    }

    // Settery
    public void setData(List<String> data) {
        this.data = data;
    }

}

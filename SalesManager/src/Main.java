public class Main {
    public static void main(String[] args) {
        SalesManager salesManager = new SalesManager(new int[]{1,2,3,10,25});
        System.out.println(salesManager.max());
    }
}
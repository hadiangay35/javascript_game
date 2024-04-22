var playerRed = "R"; var playerYellow = "Y";// iki oyuncu belirleniyor. playerRed'in sembolü R playerYellow'un sembolü Y
var currPlayer = playerRed;//currPlayer değişkeni oluşturuluyor başlangıçta plyerRed olarak atanıyor oyun ilerledikçe bu değer kırmızı ve sarı oyuncular arasında değişecek

var gameOver = false;//gameover değişkeni oluşturuyor. başlangıçta false olarak atanıyor çünkü oyunun bitip bitmediğini kontrol edecek
var board;// board değişkeni oluşturuluyor oyun tahtasını temsil edecek ve oyun ilerledikçe güncellenecek

var rows = 6; //board 6 sütun olacak
var columns = 7;//board 7 satır olacak
var currColumns = [];//currColumns adında bir dizi tanımlanıyor. Bu dizi, her sütunda hangi satırların dolu olduğunu tutacak.

window.onload = function() // site yüklendiğinde setGame fonksiyonunu çağıracak
{
    setGame();
}

function setGame() //oyun başladığında gerçekleşecek işlemleri içeren fonksiyon
{
    board = [];//boş bir dizi olarak tanımlanıyor çünkü oyun tahtasındaki hücreleri temsil edecek
    currColumns = [5, 5, 5, 5, 5, 5, 5];//her sütundaki boş hücre sayısını tutacak bir dizi olarak başlatılıyor. 

    for (let r = 0; r < rows; r++) //r değişkeni oyun tahtasının satırlarını oluşturur. Bu döngü, rows değişkeninin değerine kadar devam eder
    {
        let row = [];// row adında boş bir dizi oluşturulur. bu dizi bir satırdaki hücreleri temsil eder
        for (let c = 0; c < columns; c++) //c değişkenini kullanarak her satır için sütunları oluşturur. Bu döngü, columns değişkeninin değerine kadar devam eder.
        {
            row.push(' ');//her sütun için boş bir string değeri row dizisine eklenir.Bu satır ile oyun tahtasının her hücresine başlangıçta boş bir değer atanır
            let tile = document.createElement("div");// her bir hücreyi temsil eden <div> oluşuturulur
            tile.id = r.toString() + "-" + c.toString();// div elementinin id özelliği hücrenin konumunu belirler  Örneğin, ilk satırın ilk sütunundaki hücrenin id'si "0-0" olur.
            tile.classList.add("tile")// div elemtine tile sınıfı eklenir. hücrelere özel stiller uygulamak için kullanılacak
            tile.addEventListener("click", setPiece);// her hücreye bir "click" olayı eklenir oyuncunun o hücreye tıklamasını dinler ve setPiece fonksiyonunu çağırır
            document.getElementById("board").append(tile);//oluşturulan hücre board elementine eklenir Bu element, oyun tahtasının görüntülendiği alanı temsil eder.
        }
        board.push(row);//Her satır tamamlandığında, row dizisi board dizisine eklenir. Bu, oyun tahtasının tamamının oluşturulmasını sağlar.
    }
}

function setPiece() //oyuncuların taşlarını yerleştirmek ve sıra değişimini sağlamak için kullanılan fonksiyon
{
    if (gameOver) {return;}// eğer oyun bitmişse , fonksiyondan çıkılmasını sağlar. Bu, kullanıcının oyun bittikten sonra tahtaya tıklama yapmasını önler.
    
    let coords = this.id.split("-");//tıklanan hücrenin id özelliğini alır ve bu id değerini "-" karakterine göre böler. Bu sayede hücrenin satır ve sütun koordinatlarını içeren bir coords dizisi elde edilir.
    let r = parseInt(coords[0]);let c = parseInt(coords[1]);//coords dizisinin ilk elemanı (satır bilgisi) r değişkenine atanır, ikinci elemanı (sütun bilgisi) ise c değişkenine atanır. Bu işlemler için parseInt kullanılarak string değerler sayıya dönüştürülür.
    
    r = currColumns[c]; //currColumns dizisinden, c sütunundaki boş hücre sayısını alarak r değişkenine atar. Bu, taşın hangi satıra yerleştirileceğini belirler.

    if (r < 0){return;}//Eğer r değeri 0'dan küçükse, yani seçilen sütun dolu ise, fonksiyondan çıkılır. Bu durumda taşın o sütuna yerleştirilemeyeceği anlamına gelir.

    board[r][c] = currPlayer; //Oyun tahtasındaki r satırı ve c sütunundaki hücreye, currPlayer değişkenindeki oyuncunun taşı yerleştirilir.
    let tile = document.getElementById(r.toString() + "-" + c.toString());//r ve c değerlerini kullanarak, ilgili hücrenin HTML elementini alır.
    if (currPlayer == playerRed) //Eğer mevcut oyuncu playerRed ise hücreye kırmızı taş koyar ve sıra playerYellow'a geçer
    {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else //değilse hücreye sarı taş koyar ve sıra playerRed'e geçer
    {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //r değeri 1 azaltılır yani bir sonraki taşın aynı sütundaki bir üst satıra  yerleştirilebileceğini belirtir.
    currColumns[c] = r; //currColumns dizisinin ilgili sütunundaki boş hücre sayısı (r değeri) güncellenir. Bu, o sütundaki bir sonraki taşın nereye yerleştirileceğini belirler.

    checkWinner();//taş yerleştirme işleminin ardından oyunun kazananını kontrol eder.
}

function checkWinner() //kazananı kontrol eden fonksiyon
{
     for (let r = 0; r < rows; r++) //r değeri 0dan rows kadar satırları dolaşır
    {
         for (let c = 0; c < columns - 3; c++)//c değeri 0dan columnsa kadar sütunları dolaşır
         {
            if (board[r][c] != ' ') //eğer board[r][c] hücresi boş değilse aynı oyuncuya ait dört taşın yatayda yan yana olup olmadığını kontrol eder
            {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) //eğer bu koşul sağlanıyorsa setWinner(r, c) fonksiyonu çağrılarak kazanan belirlenir.
                {
                    setWinner(r, c);
                    return;//kazanan bulunduğunda fonksiyondan çıkılmasını sağlar
                }
            }
         }
    }

    for (let c = 0; c < columns; c++) //c değeri 0dan columnsa kadar sütunları dolaşır
    {
        for (let r = 0; r < rows - 3; r++) //r adlı değişkenle satırları dolaşır (r 0'dan başlar ve rows - 3 değerine kadar devam eder, çünkü dörtlü kombinasyonları kontrol ediyoruz ve son üç satırı kontrol etmek yeterlidir).
        {
            if (board[r][c] != ' ') //eğer board[r][c] hücresi boş değilse aynı oyuncuya ait dört taşın yatayda yan yana olup olmadığını kontrol eder
            {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) //eğer bu koşul sağlanıyorsa setWinner(r, c) fonksiyonu çağrılarak kazanan belirlenir.
                {
                {
                    setWinner(r, c);
                    return;//kazanan bulunduğunda fonksiyondan çıkılmasını sağlar
                }
            }
        }
    }

    
    for (let r = 0; r < rows - 3; r++) //r adlı değişkenle satırları dolaşır (r 0'dan başlar ve rows - 3 değerine kadar devam eder, çünkü dörtlü kombinasyonları kontrol ediyoruz ve son üç satırı kontrol etmek yeterlidir).
    {
        for (let c = 0; c < columns - 3; c++) //c adlı değişkenle sütunları dolaşır (c 0'dan başlar ve columns - 3 değerine kadar devam eder, çünkü dörtlü kombinasyonları kontrol ediyoruz ve son üç sütunu kontrol etmek yeterlidir).
        {
            if (board[r][c] != ' ') //eğer board[r][c] hücresi boş değilse aynı oyuncuya ait dört taşın yatayda yan yana olup olmadığını kontrol eder
            {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) //eğer bu koşul sağlanıyorsa setWinner(r, c) fonksiyonu çağrılarak kazanan belirlenir.
                {
                    setWinner(r, c);
                    return;//kazanan bulunduğunda fonksiyondan çıkılmasını sağlar
                }
            }
        }
    }


    for (let r = 3; r < rows; r++) //r adlı değişkenle satırları dolaşır (r 3'ten başlar ve rows değerine kadar devam eder, çünkü dörtlü kombinasyonları kontrol ediyoruz ve ilk üç satırı kontrol etmek yeterlidir).
    {
        for (let c = 0; c < columns - 3; c++) //c adlı değişkenle sütunları dolaşır (c 0'dan başlar ve columns - 3 değerine kadar devam eder, çünkü dörtlü kombinasyonları kontrol ediyoruz ve son üç sütunu kontrol etmek yeterlidir).
        {
            if (board[r][c] != ' ') //eğer board[r][c] hücresi boş değilse aynı oyuncuya ait dört taşın yatayda yan yana olup olmadığını kontrol eder
            {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) //eğer bu koşul sağlanıyorsa setWinner(r, c) fonksiyonu çağrılarak kazanan belirlenir.
                {
                    setWinner(r, c);
                    return;//kazanan bulunduğunda fonksiyondan çıkılmasını sağlar
                }
            }
        }
    }
}
}
function setWinner(r, c) //kazanan belli olduktan sonra çalışacak fonksiyon
{
    let winner = document.getElementById("winner");//HTML içerisinde "winner" id'sine sahip bir elementi seçer ve bu elementi winner adlı bir değişkene atar.
    if (board[r][c] == playerRed) //Eğer board[r][c] hücresindeki taş playerRed oyuncusuna aitse, winner elementinin içeriği "Red Wins" olarak güncellenir. Aksi takdirde, içerik "Yellow Wins" olarak güncellenir. 
    {
        winner.innerText = "Red Wins";             
    } 
    else 
    {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;//kazanan belirlendiği için oyun bitmiş oluyor
}

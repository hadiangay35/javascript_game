var board; //oyun tahtasının verilerini saklayacak  başta tanımsızdır
var score = 0; // skoru saklayacak veridir başta 0 olarak ayarlı
var rows = 4; var columns = 4; //oyun tahtasının boyutunu tanımlıyor yani 4 satır 4 sütun olacak

window.onload = function() {setGame();} // sayfa yüklendiğinde setGame fonksiyonunu çağıracak
    
function setGame() //oyun başladığında gerçekleşecek işlemleri içeren fonksiyon
{//
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [ //oyun tahtasındaki karelerin yerini belirler
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ] 

    for (let r = 0; r < rows; r++) //rows değerine gelene kadar kod bloğunu çalıştaracak her çalıştığında r değerini 1 arttıracak
    {
        for (let c = 0; c < columns; c++) //columns değerine gelene kadar kod bloğunu çalıştaracak her çalıştığında c değerini 1 arttıracak
        {
            let tile = document.createElement("div"); //div adında bir belge oluşturacak
            tile.id = r.toString() + "-" + c.toString(); // değerine r ve c değerini yazdıracak ve aralarına '-' işareti koyacak
            let num = board[r][c]; // yukardaki board dizisnden değer alacak
            updateTile(tile, num); //kutuyu ve içindeki sayıyı güncelleyecek
            document.getElementById("board").append(tile); //her sütun için yeni bir öğe oluşturacak bu sütunlardaki kutulara board dizisinden değer alıp ekleyecek
        }
    }
    
    setTwo();setTwo();// oyun başlamadan önce bu fonksiyonu 2 kere çağıracak
}

function updateTile(tile, num) //oyun tahtasındaki karelerin içindeki sayıları güncellemek için kullanılacak
{
    tile.innerText = ""; //karenin içini temizler
    tile.classList.value = ""; //listeyi temizler
    tile.classList.add("tile"); //karelere tile adında bir css ögesi ekliyor bu öğe karelerin görünümünü ayarlayacak
   
    
    if (num > 0) //eğer  num değeri pozitif ise 
    {
        tile.innerText = num.toString(); //tile değerini num değerine çevirecek toString de sayıyı metne dönüştürecek
        if (num <= 4096) // eğer num 4096'dan küçük veya eşitse
        {
            tile.classList.add("x"+num.toString()); //tile öğesine x ile başlayan ve num değerini içeren bir sınıf ekleyecek
        } 
        else // değilse yani num 4096'dan büyük ise 
        {
            tile.classList.add("x8192");//tile öğesine x8192 adında bir sınıf ekliyecek
        }                
    }
}

document.addEventListener('keyup', (e) => //klavyeden hangi tuşa basıldığına bakar
{
    if (e.code == "ArrowLeft") //eğer sol ok tuşuna basıldıysa slideLeft() ve setTwo() öğelerini ard arda çağıracak
    {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") //eğer sağ ok tuşuna basıldıysa slideRight() ve setTwo() öğelerini ard arda çağıracak
    {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") //eğer yukarı ok tuşuna basıldıysa slideUp() ve setTwo() öğelerini ard arda çağıracak
    {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") //eğer aşağı ok tuşuna basıldıysa slideDown() ve setTwo() öğelerini ard arda çağıracak
    {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; // her tuşa basıldıktan sonra skoru güncelleyecek ve yazacak
})

function filterZero(row) //satırdaki tüm elemanlara bakıp sıfırları filtreleyecek olan fonksiyon
{
    return row.filter(num => num != 0); //elemanları her filtrelediğinde yeni bir dizi oluşturacak ve bu dizide 0 olmayacak
}

function slide(row) //oyun tahtasındaki sütunlardaki taşları kaydıran fonksiyon
    {
       
        row = filterZero(row); // filterZero fonksiyonunu kullanarak row dizisindeki sıfır olamayan elemanlarla yeni bir dizi oluşturur ve bunu row değişkenine  atar
        for (let i = 0; i < row.length-1; i++) //row dizisinin son elemanına kadar 
        {
            if (row[i] == row[i+1]) //eğer bir eleman bir sonraki elemana eşitse 
            {
                row[i] *= 2; // mevcut elemanın değeri iki katına çıkarılır
                row[i+1] = 0; // diğer eleman sıfıra eşitlenir
                score += row[i]; // skora mevcut elemanın değeri eklenir ve güncellenir
            }
        } 
        row = filterZero(row); // tekrar filterZero fonksiyonunu kullanarak row dizisindeki sıfır olamayan elemanlarla yeni bir dizi oluşturur ve bunu row değişkenine  atar
        //add zeroes
        while (row.length < columns) {row.push(0);}  // while döngüsü kullanılarak row döngüsü sütunların sonuna kadar sıfırlarla tanımlanır. bu işlem tahtanın boş alanlarını doldurmak için yapılır
       
        return row; //row dizisi döndürülür
    }

function slideLeft() //oyun tahtasındaki sütunlardaki taşları sola doğru kaydıran fonksiyon
{
    for (let r = 0; r < rows; r++) // oyun tahtasındaki satırları dolaşmak için kullanılır, rows satır sayısını belirtir
    {
        let row = board[r]; // satır board dizisinden seçilir ve row değişkenine atanır
        row = slide(row); //slide fonksiyonun kullanarak satırı sola kaydırır ve yeni bir satır döndürür. Bu satır row değişkenine atanır
        board[r] = row; // satırı board dizisindeki ilgili satırın güncellenmiş haliyle değiştirir
        for (let c = 0; c < columns; c++) //oyun tahtasındaki sütunları dolaşmak için kullanılır, columns sütun sayısını belirtir
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());//belirli bir satır ve sütundaki taşı temsil eden DOM öğesini alır. Örneğin, r satırı ve c sütunundaki taşın ID'si r-c formatında olabilir.
            let num = board[r][c]; //board dizisindeki ilgili kutudaki değer num değişkenine atanır
            updateTile(tile, num);//updateTile adlı bir fonksiyonu çağırarak kutunun değerini günceller 
        }
    }
}

function slideRight() //oyun tahtasındaki sütunlardaki taşları sağa doğru kaydıran fonksiyon
{
    for (let r = 0; r < rows; r++) // oyun tahtasındaki satırları dolaşmak için kullanılır, rows satır sayısını belirtir
    {
        let row = board[r]; //satır board dizisinden seçilir ve row değişkenine atanır
        row.reverse(); //seçilen satırın elemanlarını ters çevirir. Yani, örneğin [0, 2, 2, 2] dizisini [2, 2, 2, 0] dizisine dönüştürür.
        row = slide(row);//slide fonksiyonunu kullanarak sağa kaydırılmış satırı elde eder. Örneğin, [2, 2, 2, 0] dizisi slide fonksiyonu ile [4, 2, 0, 0] dizisine dönüşebilir.
        board[r] = row.reverse();//row.reverse() ile ters çevrilen row dizisini tekrar ters çevirerek orijinal sırasına geri döndürür ve bu şekilde güncellenmiş satırı board dizisine atar.
        for (let c = 0; c < columns; c++)//oyun tahtasındaki sütunları dolaşmak için kullanılır, columns sütun sayısını belirtir
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());//belirli bir satır ve sütundaki taşı temsil eden DOM öğesini alır. Örneğin, r satırı ve c sütunundaki taşın ID'si r-c formatında olabilir.
            let num = board[r][c];// board dizisindeki ilgili kutudaki değer num değişkenine atanır
            updateTile(tile, num);//updateTile adlı bir fonksiyonu çağırarak kutunun değerini günceller 
        }
    }
}

function slideUp() //oyun tahtasındaki sütunlardaki taşları yukarıya doğru kaydıran fonksiyon
{
    for (let c = 0; c < columns; c++) //oyun tahtasındaki sütunları dolaşmak için kullanılır , columns sütun sayısını belirtir 
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];// o anki sütunun elemanları row dizisine atanır board dizisindeki ilgili sütundaki değerler alınarak row dizisine eklenir 
        row = slide(row);//slide fonksiyonunu kullanarak yukarı kaydırılmış row dizisini elde eder
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) //oyun tahtasındaki satırları dolaşmak için kullanılır , rows satır sayısını belirtir 
        {
            board[r][c] = row[r];//row dizisindeki değerler board dizisindeki ilgili kutulaara atanır.
            let tile = document.getElementById(r.toString() + "-" + c.toString());//belirli bir satır ve sütundaki taşı temsil eden DOM öğesini alır. Örneğin, r satırı ve c sütunundaki taşın ID'si r-c formatında olabilir.
            let num = board[r][c];// board dizisindeki ilgili kutudaki değer num değişkenine atanır
            updateTile(tile, num);//updateTile adlı bir fonksiyonu çağırarak kutunun değerini günceller 
        }
    }
}

function slideDown() //oyun tahtasındaki sütunlardaki taşları aşağıya doğru kaydıran fonksiyon
{
    for (let c = 0; c < columns; c++) //oyun tahtasındaki sütunları dolaşmak için kullanılır , columns sütun sayısını belirtir 
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];//o anki sütunun elemanları row dizisine atanır board dizisindeki ilgili sütundaki değerler alınarak row dizisine eklenir 
        row.reverse();//row dizisinin elemanlarını ters çevirir. Bu, sütunu yukarıdan aşağı doğru kaydırmak yerine aşağıdan yukarı doğru kaydırmak için kullanılır.
        row = slide(row);//slide fonksiyonunu kullanarak aşağıya kaydırılmış row dizisini elde eder.
        row.reverse();// row dizisinin elemanlarını tekrar ters çevirir. Bu, aşağıya kaydırılan sütunu tekrar doğru yönde göstermek için kullanılır.
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++)//tahtadaki satırları dolaşmak için kullanılır rows satır sayısıdır
        {
            board[r][c] = row[r];//row dizisindeki değerler board dizisindeki ilgili kutulara atanır.
            let tile = document.getElementById(r.toString() + "-" + c.toString());//belirli bir satır ve sütundaki taşı temsil eden DOM öğesini alır. Örneğin, r satırı ve c sütunundaki taşın ID'si r-c formatında olabilir.
            let num = board[r][c];//board dizisindeki ilgili hücredeki değer num değişkenine atanır.
            updateTile(tile, num);//updateTile adlı bir fonksiyonu çağırarak kutunun değerini günceller 
        }
    }
}

function setTwo() //oyun tahtasında boş bir kare bulunana kadar rastgele bir konuma 2 değeri yerleştiren fonksiyon
{
    if (!hasEmptyTile()) {return;} //eğer pyun tahtasında boş bir kare yoksa(yani !hasEmptyTile() fonksiyonu false döndürürse) fonsiyon sonlandırılır ve herhangi bir işlem yapılmaz
    
    let found = false; // found adında bir değişken oluşturlur ve başlangıçta false değeri atanır
    while (!found) //boş bir kutu bulunana kadar döngü devam eder
    {
        
        
        let r = Math.floor(Math.random() * rows);let c = Math.floor(Math.random() * columns); //rastgele bir satır ve sütun seçilir. Math.random() fonksiyonu 0 ile 1 arasında rastgele bir sayı üretir, çarpma ve yuvarlama işlemleriyle bu sayılar uygun aralıklara getirilir.
        
        if (board[r][c] == 0) //seçilen satır ve sütundaki kutunun değeri kontrol edilir. Eğer bu kutunun değeri 0 ise (yani boşsa)
        {
            board[r][c] = 2; //yeni bir 2 değeri atanır.
            let tile = document.getElementById(r.toString() + "-" + c.toString());//boş hücrenin DOM öğesi seçilir.
            tile.innerText = "2"; //satırıyla, DOM öğesinin metin içeriği "2" olarak ayarlanır. Bu, oyun tahtasında boş hücreye yerleştirilen 2'nin gösterimini sağlar.
            tile.classList.add("x2"); //DOM öğesine "x2" sınıfı eklenir. Bu genellikle CSS tarafında belirlenmiş olan bir stil veya görsel özellikleri uygular.
            found = true;// boş hücreye 2 değerinin yerleştirildiği bilgisi found değişkenine atanır ve döngü sonlanır.
        }
    }
}

function hasEmptyTile() //oyun tahtasında boş bir kutu olup olmadığını kontrol eden fonksiyon
{
    let count = 0; //count değişkeni oluşturulur ve başlangıçta sıfır değeri atanır. (değerleri toplamak için kullanılır)
    for (let r = 0; r < rows; r++)  //oyun tahtasındaki satırları dolaşmak için kullanılır. 
    {
        for (let c = 0; c < columns; c++)//oyun tahtasındaki sütunları dolaşmak için kullanılır.
        {
            if (board[r][c] == 0) {return true; } //her bir kutunun değeri kontrol edilir. Eğer o anki kutunun değeri 0 ise (yani boşsa), fonksiyon hemen true değeriyle sonlanır ve boş bir kutu bulunduğu bildirilir.  
        }
    }
    return false;//Eğer döngülerin içinde boş bir kutu bulunamazsa, yani her hücre dolu ise, fonksiyon dışındaki return false; satırı çalışır ve false değeri döndürülür, yani oyun tahtasında boş bir kutu olmadığı bildirilir.
}
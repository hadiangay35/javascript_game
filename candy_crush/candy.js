var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];//şekerlerin renklerini temsil eder
var board = [];//oyun tahtası
var rows = 9;//oyun tahtasının satır sayısı
var columns = 9;//oyun tahtasının sütun sayısı
var score = 0;//skor

//oyun tahtasındaki bir kare üzerinde yapılan işlemlerde geçici olarak kullanılacak
var currTile;
var otherTile;


window.onload = function() //sayfa yüklendiğinde çaılşacak
{
    startGame();//startGame fonksiyonu çağrılarak oyun başlatılacak

    //10 snde 1 çalışacak 
    window.setInterval(function(){
        crushCandy();//şekerleri patlatmak için crushCandy fonksiyonu çağrılarak patlatılacak
        slideCandy();//şekerleri kaydırmak için slideCandy fonksiyonu çağrılarak kaydırılacak
        generateCandy();//yeni şekerler oluşturacak
    }, 100);
}

function randomCandy() //candies dizisinden rastgele bir şeker seçmek için kullanılan fonksiyon
{
    return candies[Math.floor(Math.random() * candies.length)]; //0 - 5.99
}

function startGame() //oyun tahtasını oluşturacak fonksiyon
{
    for (let r = 0; r < rows; r++) //oyun tahtasının satırlarını oluşturacak
    {
        let row = [];//her satır için boş bir dizi oluşturacak
        for (let c = 0; c < columns; c++)//oyun tahtasının sütunlarını oluşturacak
        {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");//her hücre  için img elementi oluşturuyor
            tile.id = r.toString() + "-" + c.toString();// hücrenin satır ve sütun bilgisini içeren bir dize oluşturacak
            tile.src = "./images/" + randomCandy() + ".png";//rastgele bir şeker görüntüsünü temsil eden bir URL oluşturur.

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //Bir şekerin sürüklenmeye başladığını algılar.
            tile.addEventListener("dragover", dragOver);  //Bir şekerin üzerine sürüklenirken tetiklenir.
            tile.addEventListener("dragenter", dragEnter); //Bir şekerin üzerine sürüklendiğinde tetiklenir.
            tile.addEventListener("dragleave", dragLeave); //Bir şekerin üzerinden sürüklendiğinde tetiklenir.
            tile.addEventListener("drop", dragDrop); //Bir şeker bırakıldığında tetiklenir.
            tile.addEventListener("dragend", dragEnd); //sürükleme işlemi tamamlandığında tetiklenir ve şekerlerin yer değiştirmesini sağlar.

            document.getElementById("board").append(tile);//img elementi boarda atanır
            row.push(tile);//tile satırın sonuna eklenir
        }
        board.push(row);//Oluşturulan satır (row) diziye (board) eklenir.
    }

    console.log(board);//oyun tahtasının içeriğini konsola yazdıracak
}

function dragStart() //şekeri sürüklemeye başlamadan önce çağrılır ve taşınacak olan o anki şekeri temsil eder
{
    currTile = this;
}

//kullanıcı şekeri sürüklerken  tarayıcıya sürükleme işleminin varsayılan davranışını durdurmasını söyler
function dragOver(e) 
{
    e.preventDefault();
}

function dragEnter(e) 
{
    e.preventDefault();
}

function dragLeave() 
{
//sürüklenen şeker başka bir şekerin üzerinden çıkarıldığında çağrılır ve herhangi bir işlem yapmaz.
}

function dragDrop() {
    //şekerin üzerine bırakıldığı hücreyi ifade ediyor
    otherTile = this;
}

function dragEnd() //sürükleme işlemi bittikten gerçekleşecek işlemler
{

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) //currTile ve otherTile öğelerinin src özelliklerinde "blank" kelimesi varsa, işlemleri sonlandırır 
    {
        return;
    }

    //currTile ve otherTile öğelerinin ID'sini kullanarak koordinatları alır ve bu koordinatlardan satır ve sütun değerlerini çıkarır.
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();//yapılan hamlenin geçerli olup olmadığını kontrol eder ve bu duruma göre validMove değişkenine bir değer atar. Eğer hamle geçerli değilse, resimleri tekrar değiştirerek eski duruma döner.
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() //oyun tahtasında şeker patlamalarını arar ve bunları patlatır. 
{
    crushThree();// Üçlü şeker patlamalarını arar ve patlatır
    document.getElementById("score").innerText = score;// Puanı günceller
}

function crushThree()//üçlü şeker patlamaları 
{
    //check rows
    for (let r = 0; r < rows; r++) //oyun tahtasının her satırını dolaşır.
    {
        for (let c = 0; c < columns-2; c++) //her satırdaki sütunları tarar.
        {
            //Her üç sütundaki şekerin src değeri (renk) kontrol edilir.
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            //Eğer üç şekerin rengi aynıysa ve boş bir hücre değilse, üç şeker patlatılır
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;//skora 30 puan eklenir.
            }
        }
    }

    
    for (let c = 0; c < columns; c++) //oyun tahtasının her satırını dolaşır.
    {
        for (let r = 0; r < rows-2; r++) //her sütundaki satırları tarar.
        {
            //Her üç satırdaki şekerin src değeri (renk) kontrol edilir.
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            //Eğer üç şekerin rengi aynıysa ve boş bir hücre değilse, üç şeker patlatılır
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;//skora 30 puan eklenir.
            }
        }
    }
}

function checkValid() //yun tahtasındaki mevcut durumun geçerli olup olmadığını kontrol eden fonksiyonz
{
    //check rows
    for (let r = 0; r < rows; r++) //oyun tahtasındaki her satırı dolaşır.
    {
        for (let c = 0; c < columns-2; c++) //her satırdaki şekerleri tarar.
        {
            //Her üç ardışık şekerin src özelliği (yani rengi) kontrol edilir.
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            //Eğer üç şekerin rengi aynıysa ve boş bir hücre değilse (blank.png içermiyorsa) geçerli bir durum vardır.
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) //oyun tahtasındaki her sütunu dolaşır.
    {
        for (let r = 0; r < rows-2; r++) //her sütundaki şekerleri tarar.
        {
            //Her üç ardışık şekerin src özelliği (yani rengi) kontrol edilir
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            //Eğer üç şekerin rengi aynıysa ve boş bir hücre değilse geçerli bir durum vardır.
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}


function slideCandy() //oyun tahtasındaki şekerleri aşağı kaydırmak için kullanılan fonksiyon
{
    for (let c = 0; c < columns; c++) //sütunları dolaşır.  
    {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) //her sütundaki şekerleri en alttan başlayarak tarar.
        {
            if (!board[r][c].src.includes("blank")) //Eğer şeker blank.png içermiyorsa (yani boş bir hücre değilse), bu şeker, sütunun en altındaki boş bir hücreye kaydırılır
            {
                //ind değişkeni, boş hücrenin yukarısına doğru kaydırma işleminde kullanılır ve her bir dolu hücre kaydırıldıkça azaltılır.
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) //ind değerinden başlayarak sütunun üstündeki boş hücreleri tarar.
        {
            board[r][c].src = "./images/blank.png";//boş hücrelere ./images/blank.png ataması yaparak tahtanın en üst kısmını boş hale getirir.
        }
    }
}

function generateCandy() // boş hücrelere yeni şekerler eklemek için kullanılan fonksiyon
{
    for (let c = 0; c < columns;  c++) //Sütunları dolaşarak en üstteki boş hücreleri kontrol eder.
    {
        if (board[0][c].src.includes("blank")) //Eğer bir sütunun en üstteki hücresi boşsa (blank.png içeriyorsa), o hücreye rastgele bir şeker eklenir.
        {
            board[0][c].src = "./images/" + randomCandy() + ".png";// Bunun için randomCandy fonksiyonu kullanılır ve şekerin resim dosyası yolu oluşturulur.
            //Yeni eklenen şeker, boş hücreye atanarak oyun tahtası güncellenir.
        }
    }
}
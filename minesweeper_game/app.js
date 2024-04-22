let board = [];// boş bir dizi olan board değişkeni tanımlar 
let rows = 8;//satır sayısı
let columns = 8;//sütun sayısı

let minesCount = 11; //mayın sayısı
let minesLocation = []; // mayının konumunu belirlemek için kullanılacak

let tilesClicked = 0;//oyun sırasında kaç tuğlaya tıklandığını takip eder. her tıklamdığında değer artar
let flagEnabled = false;// bayrak modunun açık veya kapalı olduğunu belirtmek için kullanılır. Başlangıçta false olarak tanımlanır, yani bayrak modu kapalıdır. 

let gameOver = false;//oyunun devam edip etmediğini kontrol eder

window.onload = function() // sayfa yüklendiğinde startGame fonksiyonu çalışacak 
{
    startGame();
}

function setMines() // oyun alanına mayın yerleştrimek için kullanılan fonksiyon
{
    let minesLeft = minesCount;//minesCount değişkenin değerini, minesLeft değişkenine atar. Bu değişken, kaç tane mayın kaldığını takip eder.
    while (minesLeft > 0) //mayın sayısı sıfıra ulaşana kadar devam eden bir döngü
    { 
        let r = Math.floor(Math.random() * rows);let c = Math.floor(Math.random() * columns);//Rastgele bir satır ve sütun seçer. bu mayının konumunu belirler
        let id = r.toString() + "-" + c.toString();//Rastgele seçilen satır ve sütun değerlerini birleştirerek bir konum ID'si oluşturur.

        if (!minesLocation.includes(id)) //eğer oluşturulan konum ID'si, "minesLocation" dizisinde bulunmuyorsa:
        {
            minesLocation.push(id);//Konum ID'sini "minesLocation" dizisine ekler.
            minesLeft -= 1;// Bir mayın eklediği için "minesLeft" değişkenini 1 azaltır.
        }
    }
}


function startGame() //oyunun başlatılması ve oyun alanının oluşturulması için kullanılan fonksiyon 
{ 
    document.getElementById("mines-count").innerText = minesCount;//"mines-count" id'sine sahip bir elementin içeriğini, "minesCount" değişkeninin değeriyle günceller. mayın sayısını kullanıcıya göstermek için kullanılır.
    document.getElementById("flag-button").addEventListener("click", setFlag);//flag-button" id'sine sahip bir butona tıklanınca "setFlag" fonksiyonunu çalıştırır. Bu, kullanıcının bayrak modunu açıp kapatmasını sağlar.
    setMines();//fonksiyonu çağırarak oyun tahtasına mayınları yerleştirir.

    //populate our board
    for (let r = 0; r < rows; r++) //Satırları temsil eden bir döngü oluşturur
    {
        let row = [];//Her bir satırın hücrelerini tutmak için bir boş dizi oluşturur
        for (let c = 0; c < columns; c++) // Sütunları temsil eden bir iç içe döngü oluşturur
        {
            let tile = document.createElement("div");//Her iç döngü adımında bir <div> elementi olan tile oluşturulur. Bu, oyun tahtasındaki bir hücreyi temsil eder.
            tile.id = r.toString() + "-" + c.toString();//Her hücreye bir id atanır. r ve c değişkenleri, döngülerin şu anki değerlerini temsil eder ve böylece her hücreye benzersiz bir id atanır.
            tile.addEventListener("click", clickTile);//Oluşturulan her hücreye bir tıklama olayı ekler. Kullanıcı oyun tahtasındaki bir hücreye tıkladığında clickTile fonksiyonu çağrılır.
            document.getElementById("board").append(tile);//Oluşturulan hücre, HTML içinde "board" adlı bir elemente eklenir. Bu, oyun tahtasının görüntülenmesini sağlar.
            row.push(tile);// Oluşturulan hücre, row adlı bir diziye eklenir. Bu dizi, oyun tahtasındaki bir satırdaki tüm hücreleri temsil eder.
        }
        board.push(row);//: Oluşturulan satırdaki tüm hücreler (row), board adlı bir diziye eklenir
    }

    console.log(board);//Oluşturulan oyun tahtasının içeriğini tarayıcının konsoluna yazdırır. Bu, oyun tahtasının oluşturulduğunu ve düzgün bir şekilde hazırlandığını doğrulamak için kullanılır.
}

function setFlag() //bayrak modunu kontrol eden fonksiyon
{
    if (flagEnabled) //Eğer bayrak modu açıksa
    {
        flagEnabled = false;//bayrak modunu kapatır 
        document.getElementById("flag-button").style.backgroundColor = "lightgray"; //bayrak butonunun arka plan rengini "lightgray" olarak değiştirir.
    }
    else //bayrak modu kapalıysa
    {
        flagEnabled = true;//bayrak modunu kapatır 
        document.getElementById("flag-button").style.backgroundColor = "darkgray";//bayrak butonunun arka plan rengini "darkgray" olarak değiştirir.
    }
}

function clickTile()//tıklanan hücreyi kontrol eden fonksiyon
{
    if (gameOver || this.classList.contains("tile-clicked")) //gameOver durumu veya tıklanan hücrenin zaten tıklanmış olduğu durumlarında çalışmayı durdurur ve işlemleri geçersiz kılar.
    {
        return;
    }

    let tile = this;//Tıklanan hücre bir tile değişkenine atanır. 
    if (flagEnabled) //eğer bayrak modu açıksa
    {
        if (tile.innerText == "") //eğer hücrenin içeriği boşsa
        {
            tile.innerText = "🚩";//hücreye bayrak eklenir
        }
        else if (tile.innerText == "🚩") //eğer hücrede bayrak varsa
        {
            tile.innerText = "";//bu bayrak kaldırılır
        }
        return;//Bu işlemlerden sonra fonksiyon çalışmayı sonlandırır
    }

    if (minesLocation.includes(tile.id)) //Eğer bayrak modu kapalıysa ve tıklanan hücre mayınların yer aldığı konumlar listesinde bulunmuyorsa, mayınları kontrol etmek için checkMine fonksiyonu çağrılır. 
    {
        // alert("GAME OVER");
        gameOver = true;//eğer tıklanan hücrede mayın varsa oyunu kaybeder 
        revealMines();// revealMines fonksiyonu çağrılarak tüm madenlerin gösterilmesi sağlanır. 
        return;//Bu işlemlerden sonra fonksiyon çalışmayı sonlandırır
    }


    let coords = tile.id.split("-"); //Tıklanan hücrenin id özelliğini alır ve bu işlem sonucunda "0-0" gibi bir id ise ["0", "0"] şeklinde bir dizi elde edilir. Bu dizi, satır ve sütun koordinatlarını içerir.
    let r = parseInt(coords[0]);//coords dizisinin ilk elemanı, hücrenin satırını temsil eder. Bu değer bir metin olarak alındığından parseInt fonksiyonu kullanılarak tam sayıya dönüştürülür ve r değişkenine atanır.
    let c = parseInt(coords[1]);//coords dizisinin ikinci elemanı, hücrenin sütununu temsil eder. Bu değer de bir metin olarak alındığından parseInt fonksiyonu kullanılarak tam sayıya dönüştürülür ve c değişkenine atanır.
    checkMine(r, c);//checkMine fonksiyonunu çağırarak tıklanan hücrenin mayın içerip içermediğini kontrol eder.

}

function revealMines() //oyun bittiğinde tüm mayınların gösterilmesi için kullanılan fonksiyon
{
    for (let r= 0; r < rows; r++) //satırdaki hücreleri tarar
    {
        for (let c = 0; c < columns; c++) //sütundaki hücreleri tarar
        {
            let tile = board[r][c];//Her döngü adımında, o anki satır ve sütundaki hücreyi tile değişkenine atar.
            if (minesLocation.includes(tile.id)) //Eğer minesLocation dizisi içindeki mayın konumlarından biri, taranan hücrenin id özelliğiyle eşleşiyorsa
            {
                tile.innerText = "💣";//mayın içeren hücreye, kullanıcıya göstermek için bir bomba ikonu eklenir.
                tile.style.backgroundColor = "red";//mayın içeren hücrenin arka plan rengi kırmızı olarak değiştirilir             
            }
        }
    }
}

function checkMine(r, c) //mayınları kontrol eden fonksiyon
{
    if (r < 0 || r >= rows || c < 0 || c >= columns) //tıklanan hücrenin oyun tahtasının dışına çıkıp çıkmadığını kontrol eder. Eğer çıkıyorsa, fonksiyonu sonlandırır ve işlem yapmaz. Bu önlem, olası hata durumlarını önlemek için eklenmiş bir güvenlik önlemidir.
    {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) //tıklanan hücrenin daha önce tıklanıp tıklanmadığını kontrol eder. eğer daha önce tıklanmışsa işlemi sonladırır/aynı hücrenin tekrar tekrar tıklanmasını engeller
    {
        return;
    }

    board[r][c].classList.add("tile-clicked");//Eğer yukarıdaki koşullar sağlanmışsa ve hücre geçerliyse, hücreye "tile-clicked" sınıfını ekler. kullanıcı tarafından tıklanan hücreleri işaretlemek için kullanılır.
    tilesClicked += 1;//Ayrıca tilesClicked değişkeni de bir artırılır, bu da kullanıcı tarafından tıklanan hücre sayısını tutar.

    let minesFound = 0;//hücrenin etrafındaki mayın sayısını tutar.

    //tıklanan hücrenin etrafında mayın olup olmadığını kontrol ediyor
    minesFound += checkTile(r-1, c-1);      //tıklanan hücrenin sol üst  köşesindeki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.
    minesFound += checkTile(r-1, c);        //tıklanan hücrenin üstündeki hücreyi kontrol eder. Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.
    minesFound += checkTile(r-1, c+1);      //tıklanan hücrenin sağ üst  köşesindeki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.

    minesFound += checkTile(r, c-1);        //tıklanan hücrenin solundaki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.
    minesFound += checkTile(r, c+1);        //tıklanan hücrenin sağındaki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.

    minesFound += checkTile(r+1, c-1);      //tıklanan hücrenin sol alt  köşesindeki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.
    minesFound += checkTile(r+1, c);        //tıklanan hücrenin altındaki hücreyi kontrol eder.Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.
    minesFound += checkTile(r+1, c+1);      //tıklanan hücrenin sağ alt  köşesindeki hücreyi kontrol eder. Eğer bu komşu hücrede maden varsa, minesFound değişkeni artırılır.

    if (minesFound > 0) // Eğer tıklanan hücrenin etrafında mayın varsa 
    {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());// o hücreye mayın sayısını yazıp stil ekler.Örneğin, x3 sınıfını ekleyerek üç mayın olduğunu gösterebilir.
    }
    else // Eğer tıklanan hücrenin etrafında mayın yoksa   
    {
        board[r][c].innerText = ""; //o hücreyi boş bırakır
        
        //ve etrafındaki hücreleri kontrol etmek için checkMine fonksiyonunu çağırır. Bu, tıklanan hücrenin etrafındaki tüm boş hücreleri açığa çıkarır ve oyun alanını genişletir. 
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) //eğer kullanıcı tüm mayın olmayan hücreleri bulduysa oyunu kazanmış demektir
    {
        document.getElementById("mines-count").innerText = "Cleared";//Cleared mesajı görüntülenir ve
        gameOver = true;//oyun sona erer
    }
}

function checkTile(r, c) //hücrede maden olup olmadığını kontrol eden fonksiyon
{
    if (r < 0 || r >= rows || c < 0 || c >= columns) //eğer verilen koordinatlar (r, c) oyun tahtasının dışındaysa, fonksiyon 0 değeriyle çıkar. Bu durumda, bu hücre mayın değil ve oyun tahtasının dışında olduğu için mayın bulunamaz.
    {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) //eğer verilen koordinatlardaki hücre mayın konumları listesinde varsa, yani bu hücre mayın içeriyorsa, fonksiyon 1 değeriyle çıkar. Bu durumda, bu hücre mayın içerir ve mayın bulunmuş olur.
    {
        return 1;
    }
    return 0;//eğer hücre oyun tahtasının sınırları içindeyse ve mayın konumları listesinde de değilse, fonksiyon 0 değeriyle çıkar. Bu durumda, bu hücre mayın içermez ve mayın bulunamaz.
}
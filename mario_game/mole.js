let currMoleTile; // oyun sırasında mevcut olan mole ve plant tuğlalarını temsil eder. Bu değişkenler, mevcut mole ve plant tuğlalarının bilgisini tutar.
let currPlantTile;
let score = 0;// skoru temsil eder, başlangıçta sıfır olarak ayarlanır
let gameOver = false;//oyunun bitip bitmediğini kontrol eder

window.onload = function()//site yüklendiğinde setGame fonksiyonu çalışacak 
{
    setGame();
}

function setGame() // oyunun başlatılması ve oyun tahtasındaki tuğlaların oluşturulması için kullanılan fonksiyon
{
    
    for (let i = 0; i < 9; i++) //0dan 8e kadar olan bir dizi oluşturur, bunlar tuğlaları belirler
    { 
        let tile = document.createElement("div");//Her turda (i değeri değişirken) bir div elementi oluşturur ve tile adlı bir değişkene atanır. Bu div, bir tuğlayı temsil eder.
        tile.id = i.toString();//Her tuğla elementine, o anki i değerini ID olarak atar.
        tile.addEventListener("click", selectTile);//Her tuğlaya bir "click" olayı ekler ve kullanıcı bir tuğlaya tıkladığında selectTile adlı bir fonksiyonu çağırır.
        document.getElementById("board").appendChild(tile);//Oluşturulan tuğlaları "board" ID'sine sahip olan bir HTML elementine ekler. Bu, tuğlaların oyun tahtasında görünmesini sağlar.
    }
    setInterval(setMole, 1000); //her 1 sn de bir setMole fonksiyonunu çağırır ve mole tuğlalarını oyun tahtasına yerleştirir
    setInterval(setPlant, 2000);//her 1 sn de bir setPlant fonksiyonunu çağırır ve plant tuğlalarını oyun tahtasına yerleştirir
}

function getRandomTile() //rastgele bir tuğlanın ID'sini seçmek için kullanılan fonksiyon
{
    //Math.random():Bu metod, 0 ile 1 arasında (1 dahil değil) rastgele bir ondalıklı sayı üretir.
    //Math.floor(Math.random() * 9):Üretilen rastgele ondalıklı sayıyı 9 ile çarparak, 0 ile 8 arasında rastgele bir tam sayı elde eder.
    let num = Math.floor(Math.random() * 9);//Elde edilen rastgele tam sayıyı num adlı bir değişkene atar.
    return num.toString();//num değişkenini bir dizeye dönüştürerek, bu dizeyi döndürür. Döndürülen dize, rastgele seçilen tuğlanın ID'sini temsil eder.
}

function setMole() //mole tuğlasının oluşturulmasını ve görüntsünün eklenmesini sağlayan fonksiyon
{
    if (gameOver) // oyunun bitip bitmediğini kontrol eder. 
    {
        return;
    }
    if (currMoleTile)// oyun tahtasında bir mole tuğlası varsa, bu tuğlayı temizler (içeriğini boşaltır).
    {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");//Yeni bir img elementi oluşturur 
    mole.src = "./monty-mole.png";//ve bu elementin görüntüsünü "./monty-mole.png" adlı dosyadan alır. Bu, yeni mole tuğlasını temsil eder.

    let num = getRandomTile();//getRandomTile() fonksiyonunu kullanarak, rastgele bir tuğlanın ID'sini alır ve num değişkenine atar.
    if (currPlantTile && currPlantTile.id == num) //Eğer plant tuğlası varsa ve bu tuğlanın ID'si, rastgele seçilen mole tuğlasının ID'si ile aynı ise, fonksiyonu sonlandırır. Bu, mole ve plant tuğlalarının aynı ID'ye sahip olmasını engeller.
    {
        return;
    }
    currMoleTile = document.getElementById(num);//Belirlenen ID'ye sahip olan tuğlayı seçer ve bu tuğlanın içine mole görüntüsünü ekler.
    currMoleTile.appendChild(mole);
}

function setPlant() //plant tuğlasının oluşturulmasını ve görüntsünün eklenmesini sağlayan fonksiyon
{
    if (gameOver)// oyunun bitip bitmediğini kontrol eder. 
    {
        return;
    }
    if (currPlantTile) //oyun tahtasında bir plant tuğlası varsa, bu tuğlayı temizler (içeriğini boşaltır).
    {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");//Yeni bir img elementi oluşturur 
    plant.src = "./piranha-plant.png";//ve bu elementin görüntüsünü "./piranha-plant.png" adlı dosyadan alır. Bu, yeni plant tuğlasını temsil eder.

    let num = getRandomTile();//getRandomTile() fonksiyonunu kullanarak, rastgele bir tuğlanın ID'sini alır ve num değişkenine atar
    if (currMoleTile && currMoleTile.id == num) //Eğer mole tuğlası varsa ve bu tuğlanın ID'si, rastgele seçilen plant tuğlasının ID'si ile aynı ise, fonksiyonu sonlandırır. Bu, mole ve plant tuğlalarının aynı ID'ye sahip olmasını engeller.
    {
        return;
    }
    currPlantTile = document.getElementById(num);//Belirlenen ID'ye sahip olan tuğlayı seçer ve bu tuğlanın içine mole görüntüsünü ekler.
    currPlantTile.appendChild(plant);
}

function selectTile()//kullanıcı tuğlayı seçtiği zaman ne yapılacaağını belirleyen fonksiyon
{
    if (gameOver)//oyunun bitip bitmediğini kontrol eder. 
    {
        return;
    }
    if (this == currMoleTile)//ğer kullanıcının tıkladığı tuğla, mevcut mole tuğlası ile aynıysa
    {
        score += 10;//skora 10 puan ekler
        document.getElementById("score").innerText = score.toString();//Skoru güncelleyerek HTML içindeki "score" elementinin içeriğini günceller 
    }
    else if (this == currMoleTile)//Eğer kullanıcının tıkladığı tuğla, mevcut mole tuğlası ile aynı değilse 
    {
        document.getElementById("score").innerText = "  GAME OVER" + score.toString();//Skoru ve "GAME OVER" mesajını içeren bir metin oluşturur ve skor alanına yazdırır 
        gameOver = true;//oyunun artık devam etmediğini belirtir.
    }
}
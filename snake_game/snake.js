var blockSize = 25;//blokların boyuttu
var rows = 20;//oyun alanının satır sayısı
var cols = 20;//oyun alanının sütun sayısı
var board;//oyun alanı
var context; //oyun alanının canvası

//snake başlangıç konumu belirleyecek x ve y değişkenleri
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;//snake haraket yönü hız değeri
var velocityY = 0;//snake haraket yönü hız değeri

var snakeBody = [];//snake vücüt parçalarını saklyana dizi

//yiyyeceğin konumunu belirleyen değişkenler
var foodX;
var foodY;

var gameOver = false;//oyunun bitip bitmediğini kontrol eden değişken

window.onload = function()//sayfa yüklendiğinde ekranda bu fonksiyon çalışacak  
{
    board = document.getElementById("board");//"board" id'li canvas elementini seçer ve board değişkenine atar. Bu sayede canvas üzerinde çizimler yapabiliriz.
    board.height = rows * blockSize; board.width = cols * blockSize;///Canvas'in yüksekliğini ve genişliğini, satır ve sütun sayıları ile blok boyutunu çarpıp ayarlar. Bu sayede canvas boyutları oyun alanının boyutuna göre otomatik olarak ayarlanır.
    context = board.getContext("2d"); //Seçilen canvas üzerinde 2D çizimleri yapmak için bir 2D bağlam oluşturur ve context değişkenine atar.

    placeFood();//Yiyeceği yerleştirmek için placeFood fonksiyonunu çağırır. 
    document.addEventListener("keyup", changeDirection);//Klavyeden bir tuşa basıldığında changeDirection fonksiyonunu çağırır. Bu fonksiyon, yılanın hareket yönünü değiştirir.
    
    setInterval(update, 1000/10); //her 10 saniyede bir update fonksiyonunu çağırır. Bu sayede yılanın hareketini ve yiyeceğin konumunu günceller.
}

function update()//oyun durumunu güncellemek için kullanılan fonksiyon 
{
    if (gameOver) //eğer oyun bitmişse aşağıdaki kodları çalıştırmayacak
    {
        return;
    }
    // her update adımında oyun alanını siyah ile kaplayacak. bu sayede ekran temizlenecek
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //yiyeceği kırmızı bir kare ile oyun alanına çizer  
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY)//yılanın başı food ile çarpıştığında  
    {
        snakeBody.push([foodX, foodY]);//yılanın vücuduna bir kare ekler
        placeFood();//ve yeni bir yiyecek yerleştirilirx    
    }

    for (let i = snakeBody.length-1; i > 0; i--) //yılanın vücudunu 
    {
        snakeBody[i] = snakeBody[i-1];//Yılanın vücudunu takip eden blokları, bir önceki bloğun konumuna taşır.
    }
    if (snakeBody.length) //Yılanın başının yeni konumunu vücut dizisinin ilk öğesine (başlangıç noktasına) atar.
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    //yılanın başını yeşil bir dikdörtgen olarak oyun alanına çizer
    context.fillStyle="lime";//yılanın rengi
    snakeX += velocityX * blockSize;//Yılanın x konumunu günceller.
    snakeY += velocityY * blockSize;//Yılanın y konumunu günceller.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i = 0; i < snakeBody.length; i++)//yılanın vücudunu çizer 
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) //Yılanın oyun alanını terk edip etmediğini kontrol eder.
    {
        gameOver = true;//Eğer yılan oyun alanının dışına çıkarsa, oyunu sonlandırır
        alert("Game Over");//ve "Game Over" mesajı gösterir
    }

    for (let i = 0; i < snakeBody.length; i++)//Yılanın kendi vücuduyla çarpışıp çarpışmadığını kontrol eder. 
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) //Eğer yılanın başı, vücuduyla çakışırsa, 
        {
            gameOver = true;//oyunu sonlandırır 
            alert("Game Over");//ve "Game Over" mesajı gösterir.
        }
    }
}

function changeDirection(e) //yılanın hareketlerini kontrol eden fonksiyon. 'e' klavye olayını temsil edet
{
    if (e.code == "ArrowUp" && velocityY != 1)//Eğer yukarı ok tuşuna basılırsa ve yılan aşağı yöne gitmiyorsa(velocityY != 1) yılanın hareket yönünü yukarı yapar(velocityY=-1)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) //Eğer aşağı ok tuşuna basılırsa ve yılan yukarı yöne gitmiyorsa(velocityY != 1) yılanın hareket yönünü aşağı yapar(velocityY=1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) //Eğer sol ok tuşuna basılırsa ve yılan sağ yöne gitmiyorsa(velocityX != 1) yılanın hareket yönünü sola yapar(velocityX=-1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) //Eğer sağ ok tuşuna basılırsa ve yılan sol yöne gitmiyorsa(velocityX != -1) yılanın hareket yönünü sağa yapar(velocityX=1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() //yiyeceğin konumunu ayarlayan fonksiyon
{
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
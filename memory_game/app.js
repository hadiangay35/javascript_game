const cardArray = //kartların bilgilerini içeren bir sabittir
[
    {name: 'fries', img: 'images/fries.jpg'},
    {name: 'cheeseburger', img: 'images/cheeseburger.jpg'},
    {name: 'hotdog', img: 'images/hotdog.jpg'},
    {name: 'icecream', img: 'images/icecream.jpg'},
    {name: 'milkshake', img: 'images/milkshake.jpg'},
    {name: 'pizza', img: 'images/pizza.jpg'},
    {name: 'fries', img: 'images/fries.jpg'},
    {name: 'cheeseburger', img: 'images/cheeseburger.jpg'},
    {name: 'hotdog', img: 'images/hotdog.jpg'},
    {name: 'icecream', img: 'images/icecream.jpg'},
    {name: 'milkshake', img: 'images/milkshake.jpg'},
    {name: 'pizza', img: 'images/pizza.jpg'},    
]

cardArray.sort(() => 0.5 - Math.random())//kartları karıştırmak için sort kullanıyor ve kartları rastgele sıralıyor

const gridDisplay = document.querySelector('#grid')//HTML içinde grid id'sine sahip bir elementi seçer ve bu elementi gridDisplay sabitine atar. Kartların gösterileceği alandır
let score = document.getElementById('score')//HTML içinde score id'sine sahip bir elementi seçer ve bu elementi score değişkenine atar.Oyuncunun puanını gösterecek alandır.
let cardChosen = [] //seçilen kartların bilgilerini saklamak için boş dizeler oluşturuyor
let cardChosenID = []//seçilen kartların ID'lerini saklamak için boş dizeler oluşturuyor
const cardWon = []//kazanılan kartların bilgilerini saklamak için boş dizeler oluşturuyor


function createBoard()//oyun tahtasını oluşturmak için kullanılan fonksiyon
{
    for(let i=0;i<cardArray.length;i++)//cardArray dizisinin her elemanı için bir döngü oluşturulur.
    {
        const card = document.createElement('img')//Her kart için bir <img> elementi oluşturulur ve card adında bir değişkene atanır.
        card.setAttribute('src' , 'images/blank.jpg')//Kartın arkası başlangıçta blank.jpg resmi olarak ayarlanır.
        card.setAttribute('data-id' , i)//Kartın data-id özelliği, kartın cardArray içindeki dizinini (i) temsil eder.
        card.addEventListener('click', flipCard)//karta tıklandığında flipCard fonksiyonunu çağıracak
        gridDisplay.appendChild(card) //Oluşturulan kart, gridDisplay adlı bir HTML elementine eklenir. oyun tahtasını temsil eder ve kartlar buraya eklenerek gösterilir.
    }
}
createBoard() //createBoard fonksiyonunu çağırarak oyun tahtası oluşturulur

function checkMatch() //kullanıcının seçtiği kartları konrol eden fonksiyon
{
    const cards = document.querySelectorAll('#grid img')//grid ID'sine sahip olan HTML elementi içindeki tüm img elementlerini seçer ve bu elementleri cards listesine atar

    const optionOneID = cardChosenID[0]//cardChosenID dizisindeki ilk ve ikinci elemanları optionOneID ve optionTwoID değişkenlerine atar. Bu değişkenler, seçilen kartların ID'lerini temsil eder.
    const optionTwoID = cardChosenID[1]
    

    if(cardChosen[0] === cardChosen[1]) //eğer seçilen 2 kartın değerleri aynıysa yani kartlar eşleşmişse
    {
        cards[optionOneID].setAttribute('src', 'images/white.png')//1. kartın görüntüsü white.png olarak ayaralnır
        cards[optionTwoID].setAttribute('src', 'images/white.png')//2. kartın görüntüsü white.png olarak ayaralnır
        cards[optionOneID].removeEventListener('click', flipCard)//1. kartın tıklanma özelliği kaldırılır
        cards[optionTwoID].removeEventListener('click', flipCard)//2. kartın tıklanma özelliği kaldırılır
        cardWon.push(cardChosen)//bu iki kart cardWon dizisine eklenir
    }
    else //eğer iki kart eşleşmiyorsa 2 kartın görüntüsü blank.jpg olarak ayarlanır
    {
        cards[optionOneID].setAttribute('src', 'images/blank.jpg')
        cards[optionTwoID].setAttribute('src', 'images/blank.jpg')
    }

    score.textContent = cardWon.length //skorun değeri cardWon dizisinin uzunluğuyla güncellenir
    cardChosen = []// bu iki dize boşaltır ve bir sonarki kart seçimine hazır hale getirilir
    cardChosenID = []
    if(cardWon.length == cardArray.length/2)// eğer cardWon dizisinin uzunluğu cardArray dizisinin uzunluğunun yarısına eşitse
    {
        score.innerHTML = 'Tebrikler Kazandınız!'//skora 'Tebrikler Kazandınız!' yazısı eklenir
    }

}

function flipCard() //kullanıcının kartları çevirmesini ve eşleştirme kontrolünü gerçekleştirmek için kullanılan fonksiyon
{
    const cardID = this.getAttribute('data-id')//tıklanan kartın data-id özelliğini alır
    cardChosen.push(cardArray[cardID].name)//kartın adını ve ID'sini cardChosen ve cardChosenId dizilerine ekler 
    cardChosenID.push(cardID)
    this.setAttribute('src', cardArray[cardID].img) //kartın resmini seçilen kartın resmiyle değiştirir yani kartın çevrildiğini gösterir

    if(cardChosen.length ==2)// eğer kullanıcı 2 kart seçmişse 
    {
        setTimeout(checkMatch, 500)// kartlar checkMatch özelliğiyle kontrol edilir ve kullanıcının kartları görmesi 500ms beklenir
    }
}

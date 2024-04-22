const computerChoiseDisplay=document.getElementById('computer-choise')//bilgisyarın seçimi
const userChoiseDisplay=document.getElementById('user-choise')//oyuncunun seçimi
const resultDisplay=document.getElementById('result')//sonuç

const possibleChoices = document.querySelectorAll('button')//butonlar

let userChoice //bilgisyarın seçimini tutacak değişken
let computerChoice//oyuncunun seçiminini tutacak değişken
let result//sonucu tutacak değişken

possibleChoices.forEach(possibleChoice=>possibleChoice.addEventListener("click", (e)=>//her butona click olayı ekler ve takip eder
{
    userChoice=e.target.id//kullanıcının tıkladığı butonun ID'sini alıp userChoice değişkenine atar
    userChoiseDisplay.innerHTML = userChoice //kullanıcının seçimini gösterir
    generateComputerChoice()//kullanıcı her seçim yaptıktan sonra bu fonksiyonu çağırarak bilgisayarın rastgele bir seçim yapmasını sağlar
    getResult()// kullanıcının ve bilgisayarın yaptığı seçimlere göre sonucu belirler
}))

function generateComputerChoice()//bilgisayarın rastgele bir seçim yapmasını sağlar ve bu seçimi görsel olarak kullanıcıya gösteren fonksiyon 
{
    const randomNumber = Math.floor(Math.random() * possibleChoices.length+1)//rastgele bir tam sayı elde edilir.Elde edilen rastgele tam sayı, randomNumber değişkenine atanır. 
    if(randomNumber === 1) {computerChoice = "tas"}//değeri kontrol edilerek, bu sayıya göre bilgisayarın seçimi belirlenir ve computerChoice değişkenine atanır.
    if(randomNumber === 2){ computerChoice = "kagit"}//değeri kontrol edilerek, bu sayıya göre bilgisayarın seçimi belirlenir ve computerChoice değişkenine atanır.
    if(randomNumber === 3) { computerChoice = "makas "}//değeri kontrol edilerek, bu sayıya göre bilgisayarın seçimi belirlenir ve computerChoice değişkenine atanır.
    computerChoiseDisplay.innerHTML = computerChoice//bilgisayarın seçimi görsel olarak kullanıcıya gösterir
}

function getResult()//kazananı belirleyen fonksiyon
{
    if(computerChoice === userChoice)//Eğer bilgisayar ve kullanıcı seçimi aynıysa "Berabere!" yazar
    {
        result="Berabere!"
    }
    if(computerChoice === "tas" && userChoice === "makas")//Eğer bilgisayarın seçimi taş ve kullanıcının seçimi makas ise "Maalesef...Kaybettiniz!" yazar
    {
        result="Maalesef...Kaybettiniz!"
    }
    if(computerChoice === "tas" && userChoice === "kagit")//Eğer bilgisayarın seçimi taş ve kullanıcının seçimi kağıt ise  "Tebrikler...Kazandınız!" yazar
    {
        result="Tebrikler...Kazandınız!"
    }
    if(computerChoice === "kagit" && userChoice === "makas")//Eğer bilgisayarın seçimi kağıt ve kullanıcının seçimi makas ise  "Tebrikler...Kazandınız!" yazar
    {
        result="Tebrikler...Kazandınız!"
    }
    if(computerChoice === "kagit" && userChoice === "tas")//Eğer bilgisayarın seçimi kağıt ve kullanıcının seçimi taş ise  "Maalesef...Kaybettiniz!" yazar
    {
        result="Maalesef...Kaybettiniz!"
    }
    if(computerChoice === "makas" && userChoice === "kagit")//Eğer bilgisayarın seçimi makas ve kullanıcının seçimi kağıt ise  "Maalesef...Kaybettiniz!" yazar
    {
        result="Maalesef...Kaybettiniz!"
    }
    if(computerChoice === "makas" && userChoice === "tas")//Eğer bilgisayarın seçimi makas ve kullanıcının seçimi taş ise  "Tebrikler...Kazandınız!" yazar
    {
        result="Tebrikler...Kazandınız!"
    }
    
    resultDisplay.innerHTML = result//kazananı veya beraberliği ekranda gösterir.
}
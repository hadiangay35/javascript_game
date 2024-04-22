const board =document.querySelector(".table")//oyun tahtasını temsil eder
const infoLable=document.querySelector("h1")//oyunun durumu için kullanılacak
let flip=false;//sıradaki hamlenin kimin tarafından yapılacağını belirleyecek
let count=0;//oynanan hamlelerin sayısını tutacak

let startgame=()=>//oyunun başlangıç durumunu ayarlar ve oyun tahtasını oluşturur.
{
    // oyun tahtasının içeriğini temizler, böylece yeni bir oyun başlatıldığında eski oyunun kalıntıları silinir.
    board.innerHTML="";
    infoLable.textContent="";

    count=0;//hamle sayısını sıfırlar.

    board.style.pointerEvents="all";//oyun tahtasındaki tıklama etkinliklerini başlatır, böylece kullanıcılar hamlelerini yapabilir.
   
    for(let i=1;i<=9;i++) // oyun tahtasına 9 kare ekler.
    {
        let 
        square=document.createElement("div");
        square.classList.add("square");
        board.appendChild(square);

    }
    const allsquares=
    document.querySelectorAll(".square");
    allsquares.forEach(item=>{item.addEventListener("click",(e)=>//her kareye click olayı ekler ve hamleleri kontrol eder.
    {
        if(!flip)
        {
            //yeni bir <div> öğesi oluşturur ve bu öğeye .cross sınıfını ekler.
            let sign=document.createElement("div")
            sign.classList.add("cross")

            e.target.style.pointerEvents="none";//tıklanan kareye tekrar tıklanılmasını engeller

            e.target.appendChild(sign);//oluşturulan .cross öğesini tıklanan kareye ekler. Bu, kullanıcının tıkladığı kareye bir "x" işareti eklenmesini sağlar.
            check()//oyun durumunu kontrol eder ve gerekirse oyunun sonucunu belirler.
            flip=!flip;//sıradaki hamle için kontrol sağlanır.
        }
        else//if(!flip) şartı sağlanmadığında çalışır
        {
            
            let sign=document.createElement("div")//yeni bir <div> öğesi oluşturur
            sign.classList.add("circle")// oluşturulan <div> öğesine .circle sınıfını ekler ve 'o' şeklini temsil eder
            e.target.style.pointerevents="none"//tıklanan kareye tekrar tıklanılmasını engeller

            e.target.appendChild(sign);//.circle öğesini tıklanan kutuya ekler
            check()//oyun durumunu kontrol eder ve gerekirse oyunun sonucunu belirler.
            flip=!flip;//sıradaki hamle için kontrol sağlanır.
        }
    })})
}

const check=()=>// kullanıcı her tıkladıktan sonra oyun durumunu kontrol eder
{
    const allsquares=document.querySelectorAll(".square")//Tüm kareleri seçer ve allsquares değişkenine atar.

    //kazanma kombinasyonları
    let winningcombinations=
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    count++//Her kontrol adımında sayacı artırır. Bu, oyunun berabere bitip bitmediğini kontrol etmek için kullanılır.

    winningcombinations.forEach((pair) =>//Her kazanma kombinasyonu için bir döngü başlatır.x 
    {
        // X ile kazanılıp kazılmadığını kontrol eder
        let crosswin = pair.every((item)=>
        allsquares[item].firstChild?.classList.contains("cross"));

        // O ile kazanılıp kazılmadığını kontrol eder
        let circlewin=pair.every((item) => 
        allsquares[item].firstChild?.classList.contains("circle")
        );

        if(crosswin)//eğer X kazanırsa
        {
            infoLable.textContent="X KAZANDI!"//ekrana X kazandı yazdırır.
            board.style.pointerEvents="none"//Oyun bittiğinde tüm karelerin tıklanmasını engeller.
            
            //3sn sonra oyun yeniden başlar
            setTimeout(()=> 
            {
                startgame()
            },3000);
        }

        else if(circlewin)//eğer O kaznırsa
        {
            infoLable.textContent="O KAZANDI!"//ekrana O kazandı yazdırır.

            board.style.pointerEvents="none"//Oyun bittiğinde tüm karelerin tıklanmasını engeller.

            //3sn sonra oyun yeniden başlar
            setTimeout(()=> 
            {
                startgame()
            },3000);
        }

        if(count===9)//eğer tüm kareler tıklanmışsa
        {
            infoLable.textContent="BERABERE!"//ekrana berabere yazdırır.

            board.style.pointerEvents="none"//Oyun bittiğinde tüm karelerin tıklanmasını engeller.

            //3sn sonra oyun yeniden başlar
            setTimeout(()=> 
            {
                startgame()
            },3000);
        }
    })
}
startgame();//Oyun yeniden başlar

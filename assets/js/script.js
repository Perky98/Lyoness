function loadContent(file, elementId) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            let elm = document.getElementById(elementId);
            if (elm !== null) {
                elm.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

loadContent('header.html', 'header');
loadContent('main.html', 'main-page');
loadContent('footer.html', 'footer');

function loadGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');

    const gameDescriptions = {
        "speed-match-test": {
            title: "Speed Match Test",
            description: "V hre <b>Speed Match Test</b> je cieľom hráča precvičiť svoju pozornosť a rýchlosť reakcie. Na začiatku hry dostane hráč kartičku so symbolom, ktorú si musí starostlivo zapamätať. Následne mu je rýchlo zobrazená ďalšia kartička, na ktorej sa musí rozhodnúť, či obsahuje rovnaký symbol ako tá predchádzajúca. Rýchle a presné rozpoznanie, či sú symboly rovnaké alebo odlišné, je kľúčom k úspechu v tejto hre. Čím rýchlejšie a správnejšie odpovie, tým vyššie skóre získa. Speed Match Test je skvelý spôsob, ako zlepšiť pamäť, reakčný čas a schopnosť sústrediť sa, pričom hráča drží v napätí, pretože musí neustále sledovať zmeny symbolov a rýchlo reagovať.",
            iframeSrc: "./porovnanie/main.html"
        },
        "the-way-to-recycling": {
            title: "The Way to Recycling",
            description: "V hre <b>The Way to Recycling</b> musí hráč nasmerovať postavičku, ktorá nesie odpad, k správnemu smetnému košu. Cieľom je vyhnúť sa prekážkam a správne roztriediť odpad podľa jeho typu. Hráč musí postupne viesť postavičku bludiskom alebo po zložitejšej trase, aby dorazila k správnemu košu na plast, papier, sklo alebo iný druh odpadu. Táto hra podporuje orientáciu, sústredenie a zručnosti potrebné na rozpoznanie správnych spôsobov likvidácie odpadu, pričom hráč získava body za správne rozhodnutia a úspešné doručenie odpadu na miesto určenia.",
            iframeSrc: "./waytorecycle/TheWayToRecycle.html"
        },
        "pastelky": {
            title: "Pastelky",
            description: "V hre <b>Pastelky</b> si hráč otestuje svoju pamäť a sústredenie. Na obrazovke sa mu na krátky čas zobrazí niekoľko pasteliek rôznych farieb, usporiadaných v určitom poradí. Hráč má len niekoľko sekúnd na zapamätanie presného poradia farieb, pretože po uplynutí času sa pastelky náhodne poprehadzujú. Následne je jeho úlohou pomocou funkcie „drag-and-drop“ (ťahaj a pusti) pastelky presunúť späť do pôvodného poradia. Za každý správny pokus hráč získava body, pričom obtiažnosť hry sa postupne zvyšuje pribúdajú ďalšie pastelky. Pastelky sú ideálnou hrou na zlepšenie pamäťových schopností a sústredenia.",
            iframeSrc: "./pastelky/pastelkyHTML.html"
        },
        "spoj-farby": {
            title: "Spoj Farby",
            description: "V hre <b>Spoj Farby</b> hráč čelí výzve správne vyplniť hracie pole farebnými políčkami. Cieľom je použiť všetky dostupné farby tak, aby sa medzi sebou neprekrývali a zároveň neostalo ani jedno políčko prázdne. Hráč musí premýšľať strategicky, aby vyplnil celé pole bez chýb, pričom si overí svoju schopnosť priestorového myslenia a logického plánovania. Za správne vyplnené pole získava body a postupuje na ďalšie úrovne, kde sa obtiažnosť postupne zvyšuje.",
            iframeSrc: "./Spoj_farby/spoj_farby.html"
        },
        "zopakuj-postupnost": {
            title: "Zopakuj Postupnosť",
            description: "V hre <b>Zopakuj Postupnosť</b> si hráč trénuje krátkodobú pamäť. Na obrazovke sa mu na niekoľko sekúnd zobrazí sekvencia políčok, ktoré sa rozsvietia v určitom poradí. Hráč musí túto postupnosť pozorne sledovať a po jej zmiznutí sa ju pokúsiť presne zopakovať kliknutím na políčka v správnom poradí. Čím dlhšiu sekvenciu dokáže zapamätať a zopakovať, tým viac bodov získava. Postupne sa úlohy stávajú náročnejšími, keď sa postupnosť predlžuje alebo zrýchľuje, čím hra výborne precvičuje pamäť a pozornosť.",
            iframeSrc: "./postupnosti/main.html"
        }
    };

    if (game && gameDescriptions[game]) {
        document.getElementById("details-page").innerHTML = `
            <section class="top-sec">
                <div class="full-width">
                    <div class="title">
                        <img src="./assets/img/sun.png" alt="Sun" class="ts-sun">
                        <h1>${gameDescriptions[game].title}</h1>
                    </div>
                    <img src="./assets/img/clouds.png" alt="Clouds" class="ts-clouds">
                    <iframe src="${gameDescriptions[game].iframeSrc}" class="ts-game-img" frameborder="0"></iframe>
                </div>
            </section>
            <section class="bottom-sec">
                <div class="container">
                    <div class="games-details">
                        <h2 class="game-title">Popis hry</h2>
                        <p class="game-desc">${gameDescriptions[game].description}</p>
                    </div>
                </div>
            </section>`;
    } else {
        document.getElementById("details-page").innerHTML = "<p>Hra nebola nájdená.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadGameDetails);
function scaleIframe() {
    const iframe = document.getElementById("game-frame");
    const container = iframe.parentElement;

    // Získame veľkosti kontajnera
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Nastavenie rozmerov iframe
    iframe.style.transform = `scale(${Math.min(containerWidth / iframe.offsetWidth, containerHeight / iframe.offsetHeight)})`;
}

// Zavoláme funkciu pri načítaní a zmene veľkosti okna
window.addEventListener("resize", scaleIframe);
window.addEventListener("load", scaleIframe);

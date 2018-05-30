const baseURL= "https://pokeapi.co/api/v2/pokemon/";
let url;

const p1Input = document.querySelector(".fOneInput");
const p2Input = document.querySelector(".fTwoInput");
const p1NameSet = document.getElementById("fOneName");
const p2NameSet = document.getElementById("fTwoName");
const p1ImageSet = document.getElementById("fOneImage");
const p2ImageSet = document.getElementById("fTwoImage");
const p1Str = document.getElementById("p1StrNum");
const p1Def = document.getElementById("p1DefNum");
const p2Str = document.getElementById("p2StrNum");
const p2Def = document.getElementById("p2DefNum");
const p1InitHp = document.getElementById("p1Hp");
const p2InitHp = document.getElementById("p2Hp");
const p1HpBox = document.getElementById("fOneHpNum");
const p2HpBox = document.getElementById("fTwoHpNum");
const winnerBox = document.getElementById("fight");
const winnerName = document.getElementById("name");
const winsText = document.getElementById("wins");

winnerBox.setAttribute("style", "display: none");


let p1Name;
let p2Name;
let winName;
// console.log(p1InitHp)
// console.log()

const selectP1 = document.querySelector('.p1Button');
const selectP2 = document.querySelector('.p2Button');
const fightButton = document.querySelector('.fightButton');

selectP1.addEventListener('click', p1Search);
selectP2.addEventListener('click', p2Search);
fightButton.addEventListener('click', battle);

function p1Search(a){
    let pokeName = p1Input.value;
    // console.log(pokeName);

        if(pokeName.trim() == "") {
            alert("Enter a pokemon!");
        } else {
        url = baseURL + pokeName.toLowerCase();
        // console.log(url);
        
        fetch(url, {
            // mode: 'no-cors',
        })
        .then(function (response){
            // console.log(response)
            return response.json()
        })
        .then(data => {
            enterP1(data);
        })
      
    }
    
}
function enterP1(data){
    while (p1NameSet.firstChild){
        p1NameSet.removeChild(p1NameSet.firstChild);
    }
    while (p1ImageSet.firstChild){
        p1ImageSet.removeChild(p1ImageSet.firstChild);
    }
    let capName=capFirstName(data.name);
    // console.log(capName)
    p1NameSet.innerText=capName;
    p1Name=capName;
    p1ImageSet.innerHTML=`<img id= "fOneSprite" src=${data.sprites.front_default} />`
    p1Str.innerText=data.stats[2].base_stat;
    p1Def.innerText=data.stats[1].base_stat;
}

function p2Search(a){
    let pokeName2 = p2Input.value;
    // console.log(pokeName2);

        if(pokeName2.trim() == "") {
            alert("Enter a pokemon!");
        } else {
        url = baseURL + pokeName2.toLowerCase();
        // console.log(url);
        
        fetch(url, {
            // mode: 'no-cors',
        })
        .then(function (response){
            // console.log(response)
            return response.json()
        })
        .then(data => {
            enterP2(data);
        })
      
    }
    
}
function enterP2(data){
    while (p2NameSet.firstChild){
        p2NameSet.removeChild(p2NameSet.firstChild);
    }
    while (p2ImageSet.firstChild){
        p2ImageSet.removeChild(p2ImageSet.firstChild);
    }
    let capName=capFirstName(data.name);
    p2NameSet.innerText=capName;
    p2Name=capName;
    p2ImageSet.innerHTML=`<img id= "fTwoSprite" src=${data.sprites.front_default} />`
    p2Str.innerText=data.stats[2].base_stat;
    p2Def.innerText=data.stats[1].base_stat;
    
}


function battle(){
    let p1HP=document.getElementById("p1HP").innerText;
    let p2HP=document.getElementById("p2HP").innerText;
    var haveWinner = false;
    
    let p1AttackStr=document.getElementById("p1StrNum").innerText;
    let p2AttackStr=document.getElementById("p2StrNum").innerText;
    let p1DefStr=document.getElementById("p1DefNum").innerText;
    let p2DefStr=document.getElementById("p2DefNum").innerText;
    
    if (p1Name && p2Name){
        setTimeout(turn, 3000);
    } else {
        alert ("Enter combatants!");
    };

    function turn(){
        setTimeout(p1Attack, 5000);
        
        if (p2HP>0){
            setTimeout(p2Attack, 3000);
            
            if (p1HP <=0 ){
                endGame(p2Name);   
                } else {
                    setTimeout(turn, 3000);
                }
            } else {
                endGame(p1Name);
            }

        // p1Attack();
        // p2Attack();
    
    }
    function p1Attack() {
        let hitPower= randomGen();
        let defPower=Math.random();
        let turnStr = p1AttackStr*hitPower;
        let turnDef = p2DefStr*defPower;
        let hit=p1AttackStr-p2DefStr;
        p1Attacks();
        if (hit>0) {
            p2GetHit();
            p2HP -= Math.round(hit);
            if (p2HP <=0){
                document.getElementById("p2HP").innerText="RIP";
                endGame(p1Name);
            } else {
                document.getElementById("p2HP").innerText=p2HP;
                
            }
            
            //add graphic to show hit
        } else {
            console.log(`${p1Name} missed`);
        }
      
    }
    function p2Attack() {
        let hitPower= randomGen();
        let defPower=Math.random();
        let turnStr = p2AttackStr*hitPower;
        let turnDef = p1DefStr*defPower;
        let hit=p2AttackStr-p1DefStr;
        p2Attacks();
        if (hit>0) {
            p1GetHit();
            p1HP -= Math.round(hit);
            if (p1HP <=0){
                document.getElementById("p1HP").innerText="RIP";
                endGame(p2Name);
            } else {
                document.getElementById("p1HP").innerText=p1HP;
                return;
            }
            //add graphic to show hit
        } else {
            console.log(`${p2Name} missed`);
        }
      
    }
    

}
function p1GetHit(){
    document.getElementById("fOneHpNum").classList.add("flashit");
    
    setTimeout(toggleClass, 500);

    function toggleClass(){
        document.getElementById("fOneHpNum").classList.toggle("flashit");
    }
        
    }
    
    function p2GetHit(){
        document.getElementById("fTwoHpNum").classList.add("flashit");
    
    setTimeout(toggleClass, 500);

    function toggleClass(){
        document.getElementById("fTwoHpNum").classList.toggle("flashit");
    }
        
}

function p1Attacks(){
    document.getElementById("fOneSprite").classList.add("pulseit");

    setTimeout(toggleClass, 100);

    function toggleClass(){
        document.getElementById("fOneSprite").classList.toggle("pulseit");
    }
}
function p2Attacks(){
    document.getElementById("fTwoSprite").classList.add("pulseit");

    setTimeout(toggleClass, 100);

    function toggleClass(){
        document.getElementById("fTwoSprite").classList.toggle("pulseit");
    }
}
function capFirstName(x){
    for (let j in x){
        if (j == 0) {
            x = x.replace(x[j], x[j].toUpperCase());
        }
        if (x[j-1] == "-"){
            x = x.replace(x[j], x[j].toUpperCase());
            x = x.replace(x[j-1], " ");
        }
    }
    return x;
}
function randomGen(){
    return Math.random()*(.5)+.5;
    
}

function endGame(winName){
    document.getElementById("name").innerText=winName;
    setTimeout(setWinnerBox, 5000);
    function setWinnerBox(){
        winnerBox.setAttribute("style", "display: yes");
    };
    // setTimeout(location.reload(), 5000);
}
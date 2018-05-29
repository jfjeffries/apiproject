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
const p1HpBox = document.getElementById(fOneHpNum);
const p2HpBox = document.getElementById(fTwoHpNum);
let p1Name;
let p2Name;
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

var haveWinner=false;
function battle(){
    let p1HP=document.getElementById("p1HP").innerText;
    let p2HP=document.getElementById("p2HP").innerText;
    
    
    let p1AttackStr=p1Str.innerText;
    let p2AttackStr=p2Str.innerText;
    let p1DefStr=p1Def.innerText;
    let p2DefStr=p2Def.innerText;
    
    if (p1Name && p2Name){
        turn(haveWinner);
    } else {
        alert ("Enter combatants!");
    }

    function turn(haveWinner){
        // if(!haveWinner){
        // setTimeout(p1Attack, 2000);
        // setTimeout(p2Attack, 3000); 
        // } else {
        //     console.log('is this working?')
        // }
        let k=0
        do {
            setTimeout(p1Attack, 2000);
            setTimeout(p2Attack, 3000);
            console.log("turn: " + k);
            k++
    } while(!haveWinner);
    }
    function p1Attack() {
        let hitPower= randomGen();
        let defPower=randomGen();
        p1AttackStr*=hitPower;
        p2DefStr*=defPower;
        let hit=p1AttackStr-p2DefStr;
        
        if (hit>0) {
            
            p2HP -= Math.round(hit);
            if (p2HP <=0){
                document.getElementById("p2HP").innerText="RIP";
                haveWinner=true;
                console.log(p1Name + " wins");                
                return haveWinner;
                //p1wins;
                //refresh page?
            } else {
                document.getElementById("p2HP").innerText=p2HP;
                return;
            }
            
            //add graphic to show hit
        } else {
            console.log("P1 missed");
        }
      
    }
    function p2Attack() {
        let p1AttackStr=p1Str;
        let p2DefStr=p2Def;
        let hitPower=Math.random();
        let defPower=Math.random();

        p2AttackStr=p2AttackStr*hitPower;
        p1DefStr=p1DefStr*defPower;
        let hit=p2AttackStr-p1DefStr;
        if (hit>0) {
            p1getHit();
            p1HP -= Math.round(hit);
            if (p1HP <=0){
                document.getElementById("p1HP").innerText="RIP";
                haveWinner=true;
                console.log(p2Name + " wins");
                return haveWinner;
                
                //p2wins;
            } else {
                document.getElementById("p1HP").innerText=p1HP;
                return;
            }
            //add graphic to show hit
        } else {
            console.log("p2 missed");
        }
      
    }
function p1getHit(){
    setTimeout(turnRed, 2500);
    setTimeout(turnClear, 2500);
    setTimeout(turnRed, 250);
    setTimeout(turnClear, 250);
    turnClear();
    return
    function turnRed(){
        document.getElementById("fOneHpNum").style.backgroundColor="red";
    }
    function turnWhite(){
        document.getElementById("fOneHpNum").style.backgroundColor="white";
    }
    function turnClear(){
        document.getElementById("fOneHpNum").style.backgroundColor="transparent";
    }

    

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
    return Math.random();
}
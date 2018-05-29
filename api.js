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
const p1InitHp = document.getElementsByClassName("fOneHp");
const p2InitHp = document.getElementsByClassName("fTwoHp");
let p1Name;
let p2Name;


const selectP1 = document.querySelector('.p1Button');
const selectP2 = document.querySelector('.p2Button');
const fightButton = document.querySelector('.fightButton');

selectP1.addEventListener('click', p1Search);
selectP2.addEventListener('click', p2Search);
// fightButton.addEventListener('click', battle);

function p1Search(a){
    let pokeName = p1Input.value;
    console.log(pokeName);

        if(pokeName.trim() == "") {
            alert("Enter a pokemon!");
        } else {
        url = baseURL + pokeName.toLowerCase();
        // console.log(url);
        
        fetch(url, {
            // mode: 'no-cors',
        })
        .then(function (response){
            console.log(response)
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
    console.log(capName)
    p1NameSet.innerText=capName;
    p1Name=capName;
    p1ImageSet.innerHTML=`<img id= "fOneSprite" src=${data.sprites.front_default} />`
    p1Str.innerText=data.stats[2].base_stat;
    p1Def.innerText=data.stats[1].base_stat;
}

function p2Search(a){
    let pokeName2 = p2Input.value;
    console.log(pokeName2);

        if(pokeName2.trim() == "") {
            alert("Enter a pokemon!");
        } else {
        url = baseURL + pokeName2.toLowerCase();
        // console.log(url);
        
        fetch(url, {
            // mode: 'no-cors',
        })
        .then(function (response){
            console.log(response)
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
    console.log(capName)
    p2NameSet.innerText=capName;
    p2Name=capName;
    p2ImageSet.innerHTML=`<img id= "fTwoSprite" src=${data.sprites.front_default} />`
    p2Str.innerText=data.stats[2].base_stat;
    p2Def.innerText=data.stats[1].base_stat;
}


// function battle(x){
//     let p1HP=p1InitHp;
//     let p2HP=p2InitHp;
    
//     let p2AttackStr=p2Str;
//     let p1DefStr=p1Def;
//     let p2DefStr=p2Def;

//     function p1Attack() {
//         let p1AttackStr=p1Str;
//         let p2DefStr=p2Def;
//         let hitPower= math.random();
//         let defPower=math.random();

//         p1AttackStr=p1AttackStr*hitPower;
//         p2DefStr=p2DefStr*defPower;
//         let hit=p1AttackStr-p2DefStr;
//         if (hit>0) {
//             for (hit; hit > 0; hit--) {
//             console.log(hit);
//             p2HP -= hit;
//             p2NameSet.innerText=p2HP;
//         } else {
//             console.log("miss");
//         }
//       }
//     }
    
    

// }
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
function randomGen(z){
    z= math.random(z);
    return z;
}
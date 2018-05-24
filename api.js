const baseURL= "http://pokeapi.co/api/v2/pokemon/";
let url;

const p1Input = document.querySelector(".fOneInput");
const p2Input = document.querySelector(".fTwoInput");
const p1NameSet = document.getElementById("fOneName");
const p2NameSet = document.getElementById("fTwoName");
const p1ImageSet = document.getElementById("fOneImage");
const p2ImageSet = document.getElementById("fTwoImage");
const p1StatWindow = document.getElementsByClassName("fOneStats");
const p2StatWindow = document.getElementsByClassName("fTwoStats");
const p1InitHp = document.getElementsByClassName("fOneHp");
const p2InitHp = document.getElementsByClassName("fTwoHp");

const selectP1 = document.querySelector('.p1Button');
const selectP2 = document.querySelector('.p2Button');
const fightButton = document.querySelector('.fightButton');

selectP1.addEventListener('click', p1Search);
// selectP2.addEventListener('click', p2Enter);
// fightButton.addEventListener('click', battle);

function p1Search(a){
    let pokeName = p1Input.value;
    console.log(pokeName);

    if(pokeName.trim() == ""){
        alert("Enter a pokemon!");
    // }else if (typeof pokeName == 'number'){
    //     url = baseURL + pokeName;
    //     console.log(pokeName);
    //     fetch(url)
    //     .then(response => {
    //         return response.json()
    //     }).then(data => {console.log(data)})
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
    p1ImageSet.innerHTML=`<img class= "fOneImageClass" src=${data.sprites.front_default} />`
    
}
// function p1Enter(a){
//     e.preventDefault();
//     // url = baseURL + 
// }

// function p2Enter(a){

// }

// function battle(x){
    
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
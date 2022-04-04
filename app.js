const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejaFait = false;

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log(nextWeek);
let day = ('0' + nextWeek).slice(9,11);
console.log(day);
let month =('0' + (today.getMonth() + 1)).slice(-2);
console.log(month);
let year = today.getFullYear();

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;


btns.forEach( btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e){

    let nvObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    })
    // console.log(nvObj);
    let description = e.target.getAttribute('data-cookie');
    if(description === "creer") {
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    }
    else if (description === "toutAfficher"){
        listeCookie();
    }
    
}


function creerCookie(name, value, exp){

    // Si on créé un cookie avec un nom déjà existant
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        // console.log(cookie);
        let formatCookie = cookie.split('=');
        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true;
        }
        
    })

    if(dejaFait){
        infoTxt.innerText = `Un cookie possède déjà ce nom.`;
        dejaFait = false;
        return;
    }

    infoTxt.innerText = "";

    // Pour un cookie qui n'a pas de nom:
    if(name.length === 0) {
        infoTxt.innerText = `Impossible de créer le cookie. Veuillez lui donner une nom.`;
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `Cookie ${name} créé avec succès.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 2000);

}
let moyS1 = null;
let moyS2 = null;

// Validation directe pour chaque champ
document.querySelectorAll(".note-input").forEach(input => {
    input.addEventListener("input", () => {
        let val = parseFloat(input.value);
        if(!isNaN(val) && (val < 0 || val > 20)){
            alert("⚠️ La note doit être entre 0 et 20 !");
            input.value = ""; // effacer la valeur incorrecte
            input.style.border = "2px solid red";
        } else {
            input.style.border = "1px solid #ced4da";
        }
    });
});

function calculerSemestre(sem){
    let divId = sem === 1 ? "s1-matieres" : "s2-matieres";
    let outputId = sem === 1 ? "s1" : "s2";

    let total = 0, coefTotal = 0;
    let allFilled = true;

    document.querySelectorAll("#"+divId+" .col-12").forEach(div=>{
        let coef = 1;
        let label = div.querySelector("label").innerText;
        let m = label.match(/Coef (\d+)/);
        if(m) coef = parseInt(m[1]);

        let inputs = div.querySelectorAll("input");
        let values = [];
        inputs.forEach(input=>{
            if(input.value === ""){
                allFilled = false;
                input.style.border = "2px solid red";
            } else {
                values.push(parseFloat(input.value));
            }
        });

        if(values.length > 0){
            let note = 0;
            if(values.length === 1) note = values[0];
            else if(values.length === 2) note = values[0]*0.6 + values[1]*0.4;
            else if(values.length === 3) note = values[0]*0.6 + values[1]*0.2 + values[2]*0.2;
            total += note*coef;
            coefTotal += coef;
        }
    });

    if(!allFilled){
        alert("⚠️ Veuillez corriger toutes les notes pour ce semestre !");
        return;
    }

    let moyenne = (total/coefTotal).toFixed(2);
    document.getElementById(outputId).innerText = "Moyenne Semestre "+sem+" : "+moyenne;

    if(sem === 1) moyS1 = parseFloat(moyenne);
    else if(sem === 2) moyS2 = parseFloat(moyenne);
}

function calculerMoyenneGenerale(){
    if(moyS1 === null || moyS2 === null){
        alert("⚠️ Veuillez calculer les deux semestres avant de calculer la moyenne générale !");
        return;
    }
    let moyenneGen = ((moyS1 + moyS2)/2).toFixed(2);
    document.getElementById("general").innerText = "🎓 Moyenne Générale : "+moyenneGen;
}

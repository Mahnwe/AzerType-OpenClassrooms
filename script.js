const listeMots = ["Cachalot", "Pétunia", "Serviette"]
const listePhrases = ["Pas de panique !", "La vie, l’univers et le reste", "Merci pour le poisson"]
let score = 0;
const choixMots = "mots"
const choixPhrases = "phrases"

let choixUtilisateur = prompt("Choisissez entre : "+choixMots+ "Ou : "+choixPhrases)
while(choixUtilisateur !== choixMots && choixUtilisateur !== choixPhrases)
{
    choixUtilisateur = prompt("Choisissez entre : "+choixMots+ " " +"ou : "+choixPhrases)
}

if(choixUtilisateur === choixMots)
{
    for (let i=0; i < listeMots.length; i++)
    {
        let motUtilisateur = prompt("Entrez un mot :" + listeMots[i])
        if(motUtilisateur === listeMots[i])
    {
        console.log("Bravo vous avez gagné !")
        score++
    } else {
        console.log("Dommage ce n'est pas le bon mot")
    }
    }
    console.log("Score final : " + score+ " sur "+ listeMots.length)
} 

else
{
        for (let i=0; i < listePhrases.length; i++)
    {
        let motUtilisateur = prompt("Entrez une phrase :" + listePhrases[i])
        if(motUtilisateur === listePhrases[i])
    {
        console.log("Bravo vous avez gagné !")
        score++
    } else {
        console.log("Dommage ce n'est pas la bonne phrase")
    }
    }
    console.log("Score final : " + score+ " sur "+ listePhrases.length)
}


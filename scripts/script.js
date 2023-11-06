const choixMots = "mots"
const choixPhrases = "phrases"

function choisirPhrasesOuMots()
{
    let choix = prompt("Choisissez entre : "+choixMots+ " ou : "+choixPhrases)
    while(choix !== choixMots && choix !== choixPhrases)
    {
        choix = prompt("Choisissez entre : "+choixMots+ " ou : "+choixPhrases)
    }
    return choix
}

function afficherResultat(score, nbrMotProposes)
{
    console.log("Score final : " + score+ " sur "+ nbrMotProposes)
}

function lancerBoucleDeJeu(listPropositions)
{
    let score = 0
        for (let i=0; i < listPropositions.length; i++)
        {
            let motUtilisateur = prompt("Entrez un mot :" + listPropositions[i])
            if(motUtilisateur === listPropositions[i])
        {
            console.log("Bravo vous avez gagné !")
            score++
        } else {
            console.log("Dommage c'est raté")
        }
        }
        return score
} 

function lancerJeu()
{
    let score = 0;
    let choixUtilisateur = choisirPhrasesOuMots()
    let nbrMotProposes = 0
    if(choixUtilisateur === choixMots)
    {
        score = lancerBoucleDeJeu(listeMots)
        nbrMotProposes = listeMots.length
    } else {
        score = lancerBoucleDeJeu(listePhrases)
        nbrMotProposes = listePhrases.length
    }
    afficherResultat(score, nbrMotProposes)
}

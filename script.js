const listeMots = ["Cachalot", "Pétunia", "Serviette"]
let score = 0;
let motUtilisateur = prompt("Entrez un mot :" + listeMots[0])

if(motUtilisateur === listeMots[0])
{
    console.log("Bravo vous avez gagné !")
    score++
    console.log("Score : " + score)
} else {
    console.log("Dommage ce n'est pas le bon mot")
}

motUtilisateur = prompt("Entrez un mot :" + listeMots[1])

if(motUtilisateur === listeMots[1])
{
    console.log("Bravo vous avez gagné !")
    score++
    console.log("Score : " + score)
} else {
    console.log("Dommage ce n'est pas le bon mot")
}

motUtilisateur = prompt("Entrez un mot :" + listeMots[2])

if(motUtilisateur === listeMots[2])
{
    console.log("Bravo vous avez gagné !")
    score++
    console.log("Score : " + score)
} else {
    console.log("Dommage ce n'est pas le bon mot")
}

console.log("Score final : " + score)

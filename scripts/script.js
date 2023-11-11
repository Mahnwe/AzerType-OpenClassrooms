/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes)
{
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nbMotsProposes}` 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score.
 * @param {string} mode : le mode de jeu 
 */
function afficherEmail(nom, email, score, mode) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Wassup c'est ${nom} et je viens de réaliser un score de ${score} dans le mode ${mode} sur le site d'Azertype ! Viens tester ce site incroyable !`
    location.href = mailto
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
    
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
    
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail, mode) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail, mode)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
    
}

function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = choixVide
    let timer = 0
    let timerDisplay = " "
    let mode = " "

    let btnValiderMot = document.getElementById("btnValiderMot")
    btnValiderMot.disabled = true
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    let inputEcriture = document.getElementById("inputEcriture")
    inputEcriture.disabled = true
    let boutonPartage = document.getElementById("boutonPartage")
    boutonPartage.disabled = true
    let partageForm = document.getElementById("form")
    partageForm.disabled = true

    afficherProposition(listeProposition[i])

    // Gestion de l'événement change sur les boutons radios. 
    
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("click", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots.
            if (event.target.value === "1") {
                btnValiderMot.disabled = false
                inputEcriture.disabled = false
                listeProposition = listeMots
                mode = "'Mots'"
                inputEcriture.focus()
                for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                    listeBtnRadio[indexBtnRadio].disabled = true
                }
            } 
            if(event.target.value === "2") {
                btnValiderMot.disabled = false
                inputEcriture.disabled = false
                listeProposition = listePhrases
                mode = "'Phrases'"
                inputEcriture.focus()
                for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                    listeBtnRadio[indexBtnRadio].disabled = true
                }
            }
            // Et on modifie l'affichage en direct.
            timer = startTimer()
            afficherProposition(listeProposition[i])
        })
    }

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            let labelResultat = document.getElementById("labelResultat")
            labelResultat.textContent = 'Bravo !'
            inputEcriture.focus()
            score++
        } else {
            let labelResultat = document.getElementById("labelResultat")
            labelResultat.textContent = 'Raté !'
            inputEcriture.focus()
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Partie terminée !")
            stopTimer(timer)
            // On désactive le bouton valider et la zone de texte
            inputEcriture.disabled = true
            btnValiderMot.disabled = true
            // On réactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true
            }
            boutonPartage.disabled = false
            partageForm.disabled = false
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    inputEcriture.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (inputEcriture.value === listeProposition[i]) {
                let labelResultat = document.getElementById("labelResultat")
                labelResultat.textContent = 'Bravo !'
                score++
            } else {
                let labelResultat = document.getElementById("labelResultat")
                labelResultat.textContent = 'Raté !'
            }
            i++
            afficherResultat(score, i)
            inputEcriture.value = ''
            if (listeProposition[i] === undefined) {
                afficherProposition("Le jeu est fini")
                stopTimer(timer)
                // On désactive le bouton valider et la zone de texte
                inputEcriture.disabled = true
                btnValiderMot.disabled = true
                // On réactive les boutons radios
                for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                    listeBtnRadio[indexBtnRadio].disabled = true
                }
                boutonPartage.disabled = false
                partageForm.disabled = false
            } else {
                afficherProposition(listeProposition[i])
            }
        }
    });

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let minutesLabel = document.getElementById("minutes")
        let secondsLabel = document.getElementById("seconds")
        timerDisplay = " en "+minutesLabel.textContent+":"+secondsLabel.textContent+"min"
        let scoreEmail = `${score} / ${i}`+timerDisplay
        gererFormulaire(scoreEmail, mode)
    })

    afficherResultat(score, i)
}
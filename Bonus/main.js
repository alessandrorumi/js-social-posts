const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed, prendendo le informazioni che ci servono dall’array di oggetti che già trovate.
// Milestone 2 - Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

// Dichiarazione div container
const container = document.getElementById('container');

// Per ogni elemento nell'array di oggetti
posts.forEach(element => {

    // Stampa nel container con innerHTML
    container.innerHTML +=
        `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${element.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${element.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`

});

// Dichiarazione Pulsante "Mi Piace"
const likeButton = document.querySelectorAll('.js-like-button');

// Dichiaro un array per tenere traccia degli ID dei post cliccati
let clickedArray = [];

// Ogni Pulsante "Mi Piace"
likeButton.forEach(button => {

    // Al click del pulsante
    button.addEventListener('click', function (event) {

        // Previene lo scroll verso l'alto
        event.preventDefault();

        // Dichiarazione Label e Icon (cambiano colore)
        const likeButtonLabel = button.querySelector('.like-button__label');
        const likeButtonIcon = button.querySelector('.like-button__icon');

        // Ottengo il valore dell'attributo dell'elemento data-postid
        const postId = button.getAttribute('data-postid');

        // Dichiarazione la variabile che itera i valori per ogni id di post (n° Like)
        const likeCounter = document.getElementById(`like-counter-${postId}`);

        // Ottiengo il conteggio attuale dei like (textContext serve per ottenere un input testuale, value è specifica per gli input)
        let currentLikes = parseInt(likeCounter.textContent);

        // Verifico se il pulsante è già stato cliccato
        const isLiked = likeButtonLabel.classList.contains('like-button--liked');

        if (!isLiked) {
            // Aggiungo l'ID del post all'array
            clickedArray.push(postId);
        } else {
            clickedArray.pop(postId);
        }

        console.log(clickedArray);

        if (isLiked) {
            // Se è già stato cliccato, decrementa il conteggio
            currentLikes--;
        } else {
            // Altrimenti, incrementa il conteggio
            currentLikes++;
        }

        // Aggiorna il conteggio dei like
        likeCounter.textContent = currentLikes;

        // Cambia il colore del testo del pulsante "Mi Piace" (toggle = interruttore)
        likeButtonLabel.classList.toggle("like-button--liked", !isLiked);
        likeButtonIcon.classList.toggle("like-button--liked", !isLiked);

    })

});

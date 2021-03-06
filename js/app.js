const dataForm = {
    formulario: document.querySelector('#formulario'),
    listaTweets: document.querySelector('#lista-tweets'),
    tweet: document.querySelector('#tweet'),
    contenido: document.querySelector('#contenido')
};
Object.freeze(dataForm);
let tweetsObj = [];
const eventListerners = () => {
    dataForm.formulario.addEventListener("submit", addTweets);
    document.addEventListener("DOMContentLoaded", () => {
        tweetsObj = JSON.parse(localStorage.getItem('tweets')) || []; // Si no hay registro en localStorage asigno un registro vació
        createHTML();
    });
};
const addTweets = (e) => {
    e.preventDefault();
    const tweet = dataForm.tweet.value.trim();
    if (tweet === "") {
        showError("No se puede agregar un Tweet vacio");
        return;
    }
    ;
    const tweetObj = {
        id: Date.now(),
        tweet
    };
    tweetsObj = [...tweetsObj, tweetObj];
    createHTML();
    dataForm.formulario.reset();
};
const showError = (error) => {
    removeMessage();
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add("error");
    dataForm.contenido.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    }, 2500);
};
const removeMessage = () => {
    const limpiarError = document.querySelector('p.error');
    if (limpiarError) {
        limpiarError.remove();
    }
    ;
};
const createHTML = () => {
    removeHTML();
    if (tweetsObj.length > 0) {
        tweetsObj.map(tweets => {
            const { id, tweet } = tweets;
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.textContent = "X";
            const li = document.createElement('li');
            li.textContent = tweet;
            li.appendChild(btnDelete);
            dataForm.listaTweets.appendChild(li);
            btnDelete.onclick = () => {
                deleteTweet(id);
            };
        });
    }
    syncStorage();
};
const syncStorage = () => {
    localStorage.setItem('tweets', JSON.stringify(tweetsObj));
};
const removeHTML = () => {
    while (dataForm.listaTweets.firstChild) {
        dataForm.listaTweets.firstChild.remove();
    }
    ;
};
const deleteTweet = (id) => {
    tweetsObj = tweetsObj.filter(tweet => tweet.id !== id);
    createHTML();
};
eventListerners();

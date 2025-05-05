// Snack 1
// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post.
// Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

fetch("https://dummyjson.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.title);
  })
  .catch((error) => {
    console.error("errore nel recpero post", error);
  });

function getPostTitle(id) {
  return fetch(`https://dummyjson.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => data.title);
}

getPostTitle(2).then((title) => console.log(title));

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

function getPost(id) {
  return fetch(`https://dummyjson.com/posts/${id}`).then((res) => res.json());
}
getPost(1).then((data) => console.log(data));

function getPostAndUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then((res) => res.json())
          .then((user) => {
            const result = {
              ...post,
              user,
            };
            resolve(result);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

getPostAndUser(1)
  .then((post) => console.log(post))
  .catch(console.error);

// Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6.
// Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato.
// Se il numero esce due volte di fila, stampa "Incredibile!".

function lanciaDado() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject("il dado si è incastrato!");
        return;
      }

      const numero = Math.floor(Math.random() * 6) + 1;
      resolve(numero);
    }, 3000);
  });
}

lanciaDado()
  .then((num) => console.log("Hai lanciato:", num))
  .catch((err) => console.error("Errore:", err));

function creaLanciaDado() {
  let ultimoNumero = null;

  return function () {
    return lanciaDado()
      .then((numero) => {
        if (numero === ultimoNumero) {
          console.log("che fortuna!");
        }
        ultimoNumero = numero;
        console.log("Hail lanciato:", numero);
        return numero;
      })
      .catch((err) => console.error("Errore:", err));
  };
}

const lancia = creaLanciaDado();
lancia();
lancia();

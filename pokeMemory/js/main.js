import getPokemon from "./getPokemon.js";
const $templateCardPokemon = document.getElementById("card-pokemon").content;
const $fragmentPokemon = document.createDocumentFragment();
const $container = document.getElementById("container-card");
const $attempt=document.getElementById("attempt");
const $time=document.getElementById("time");
const pokemons = await getPokemon();

//variables pra el juego
let flippedCard = 0;
let gano = false;
let namesPokemon = [];
let attempt=5;
let pares=0;
let time=0


const render = (pokemons) => {
  pokemons.forEach((el) => {
    let $cardPokemon = document.createElement("div");
    $cardPokemon.setAttribute("class", "card-pokeBola");
    $cardPokemon.dataset.id= el.id;
    $templateCardPokemon.querySelector(".card__avatar").src = el.avatar;
    let $clone = $templateCardPokemon.cloneNode(true);
    $cardPokemon.appendChild($clone);
    $cardPokemon.addEventListener("click", (e) => {
      controlFlippedCard(e.currentTarget,el);
    },{
      capture:false,
      once:true
    });
    $fragmentPokemon.appendChild($cardPokemon);
  });
  $container.appendChild($fragmentPokemon);
};

const controlFlippedCard = (cardPokemon,el) => {
  flippedCard++;
  cardPokemon.classList.add("card-pokeBola--active");
  if (flippedCard <= 2) {
    el.cardPokemon=cardPokemon;
    namesPokemon.push(el)
  }

  if (flippedCard === 2) {
    comparePokemon(namesPokemon)
    
  };
};


const timers=setInterval(()=>{
  time++;  
  $time.textContent=`${time}`
  if(time===120){
    clearInterval(timers);
    alertMessage("el tiempo acabo",gano)
  } 
  
},1000);



const comparePokemon = (pokemons) => {
  if(pokemons[0].name===pokemons[1].name) {
    pares++;
    pokemons[0].cardPokemon.classList.add("card-pokeBola--found");
    pokemons[1].cardPokemon.classList.add("card-pokeBola--found");
    
    if(pares==6)  alertMessage("Felecidades acabas de ganar el juego", gano=true)
  }else{
    attempt--;
    $attempt.textContent=`${attempt}`
    setTimeout(() => {
      pokemons[0].cardPokemon.classList.remove("card-pokeBola--active");
      pokemons[1].cardPokemon.classList.remove("card-pokeBola--active");
      pokemons[0].cardPokemon.addEventListener("click", (e) => {
        controlFlippedCard(e.currentTarget,pokemons[0]);
      },{
        capture:false,
        once:true
      });
      pokemons[1].cardPokemon.addEventListener("click", (e) => {
        controlFlippedCard(e.currentTarget,pokemons[1]);
      },{
        capture:false,
        once:true
      });
      if(attempt==0) alertMessage("lo siestimos mucho acaba de perder el juego",gano);
    },500);
    
  } 
 
  resetarVariables();
}; 

const resetarVariables = () => {
  flippedCard = 0;
  namesPokemon = [];
};

const alertMessage=(message,gano)=>{
  Swal.fire({
    title: gano ? "Gano" :"Perdio" ,
    text: `${message}`,
    icon: gano? "success":'error',
    confirmButtonText: 'jugar otra vez',
    
  
  })
  .then(res=>res.isConfirmed ? location.reload() : $container.textContent="recarge para jugar")

  
} 


render(pokemons);

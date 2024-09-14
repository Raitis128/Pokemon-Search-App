const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const image = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const stats = [hp, attack, defense, specialAttack, specialDefense, speed];

const fetchData = async () => {
  const clearInput = searchInput.value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-");
  const url = `https://pokeapi.co/api/v2/pokemon/${clearInput}`;
  try {
    const response = await fetch(url);
    if (!response.ok || !clearInput) {
      alert("Pokémon not found");
      throw new Error("Pokémon not found");
    } else {
      const data = await response.json();
      pokemonTypes.innerHTML = "";

      pokemonName.textContent = data.name;
      pokemonId.textContent = `#${data.id}`;
      weight.textContent = `Weight: ${data.weight}`;
      height.textContent = `Height: ${data.height}`;

      image.src = data.sprites.front_default;
      image.style.visibility = "visible";
      image.alt = `Pokemon ${data.name} image`;

      const { types } = data;
      types.forEach((type) => {
        pokemonTypes.innerHTML += `<li>${type.type.name}</li>`;
      });

      stats.forEach((stat, index) => {
        stat.textContent = data.stats[index].base_stat;
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

searchButton.addEventListener("click", fetchData);

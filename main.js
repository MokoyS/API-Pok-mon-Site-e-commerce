    document.addEventListener('DOMContentLoaded', () => {
        const pokemonContainer = document.getElementById('pokemonContainer');
        const searchInput = document.getElementById('searchInput');

        // Fonction pour récupérer les données depuis l'API
        async function fetchPokemonData(searchTerm = '') {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
                
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
        
                const data = await response.json();
                return [data];
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
                return [];
            }
        }

        // Fonction pour créer les éléments HTML pour chaque Pokemon
        async function createPokemonCards(searchTerm = '') {
            const pokemonList = await fetchPokemonData(searchTerm);
        
            pokemonContainer.innerHTML = '';
        
            pokemonList.forEach(async (pokemonData) => {
                if (pokemonData.sprites && pokemonData.sprites.front_default) {
                    const card = document.createElement('div');
                    card.classList.add('card');
        
                    const title = document.createElement('p');
                    title.classList.add('titre');
                    title.textContent = pokemonData.name;
        
                    const image = document.createElement('img');
                    image.src = pokemonData.sprites.front_default;
                    image.alt = pokemonData.name;
        
                    const price = document.createElement('p');
                    price.classList.add('prix');
                    price.textContent = `Prix: ${pokemonData.base_experience} €`; // Utilisation de base_experience comme prix
        
                    const buyLink = document.createElement('a');
                    buyLink.href = '#'; // Ajoutez le lien d'achat approprié ici
                    buyLink.textContent = 'BUY';
        
                    const buyDiv = document.createElement('div');
                    buyDiv.classList.add('buy');
                    buyDiv.appendChild(price);
                    buyDiv.appendChild(buyLink);
        
                    card.appendChild(title);
                    card.appendChild(image);
                    card.appendChild(buyDiv);
        
                    pokemonContainer.appendChild(card);
                }
            });
        }
        
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            createPokemonCards(searchTerm);
        });

        createPokemonCards();
    });



    document.addEventListener('DOMContentLoaded', () => {
        const classementContainer = document.getElementById('classement');
    
        // Fonction pour récupérer les données depuis l'API
        async function fetchTopPokemonData() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10');
                
                if (!response.ok) {
                    throw new Error('Error fetching top Pokemon data');
                }
        
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error('Error fetching top Pokemon data:', error);
                return [];
            }
        }
    
        // Fonction pour créer les éléments HTML pour chaque Pokemon
        async function createTopPokemonCards() {
            const topPokemonList = await fetchTopPokemonData();
        
            classementContainer.innerHTML = '';
        
            topPokemonList.forEach(async (pokemon) => {
                const pokemonData = await fetchPokemonDetails(pokemon.url);
    
                if (pokemonData.sprites && pokemonData.sprites.front_default) {
                    const card = document.createElement('div');
                    card.classList.add('card');
        
                    const title = document.createElement('p');
                    title.classList.add('titre');
                    title.textContent = pokemonData.name;
        
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');
    
                    const image = document.createElement('img');
                    image.src = pokemonData.sprites.front_default;
                    image.alt = pokemonData.name;
    
                    imageContainer.appendChild(image);
    
                    const price = document.createElement('p');
                    price.classList.add('prix');
                    price.textContent = `Prix: ${pokemonData.base_experience} €`;
    
                    const buyLink = document.createElement('a');
                    buyLink.href = '#';
                    buyLink.textContent = 'BUY';
                    buyLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        addToLocalStorage(pokemonData);
                    });
    
                    const buyDiv = document.createElement('div');
                    buyDiv.classList.add('buy');
                    buyDiv.appendChild(price);
                    buyDiv.appendChild(buyLink);
    
                    card.appendChild(title);
                    card.appendChild(imageContainer);
                    card.appendChild(buyDiv);
    
                    classementContainer.appendChild(card);
                }
            });
        }

        // Fonction pour ajouter un Pokemon au stockage local
        function addToLocalStorage(pokemon) {
        let localStorageData = JSON.parse(localStorage.getItem('selectedPokemon')) || [];
        localStorageData.push(pokemon);
        localStorage.setItem('selectedPokemon', JSON.stringify(localStorageData));

        // Afficher les Pokémon présents dans le stockage local
        console.log('Pokémon dans le stockage local :', localStorageData);

        alert(`Pokemon ${pokemon.name} ajouté à votre collection locale !`);
}

    
        // Fonction pour récupérer les détails spécifiques d'un Pokemon
        async function fetchPokemonDetails(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }
    
        // Appel de la fonction pour afficher les 10 premiers Pokemon
        createTopPokemonCards();
    });

    document.addEventListener('DOMContentLoaded', () => {
        const localStorageContainer = document.getElementById('localStorageContainer');
    
        // Fonction pour afficher les Pokémon du stockage local
        function displayLocalStoragePokemon() {
            const localStorageData = JSON.parse(localStorage.getItem('selectedPokemon')) || [];
    
            localStorageContainer.innerHTML = '';
    
            localStorageData.forEach((pokemonData) => {
                const card = createPokemonCard(pokemonData);
                localStorageContainer.appendChild(card);
            });
        }
    
        // Fonction pour créer les éléments HTML pour chaque Pokemon
        function createPokemonCard(pokemonData) {
            const card = document.createElement('div');
            card.classList.add('card-cart');
    
            const title = document.createElement('p');
            title.classList.add('titre-cart');
            title.textContent = pokemonData.name;
    
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container-cart');
    
            const image = document.createElement('img');
            image.src = pokemonData.sprites.front_default;
            image.alt = pokemonData.name;
    
            imageContainer.appendChild(image);
    
            const price = document.createElement('p');
            price.classList.add('prix-cart');
            price.textContent = `Prix: ${pokemonData.base_experience} €`;
    
            // Supprimer l'élément <a> "BUY"
            // const buyLink = document.createElement('a');
            // buyLink.href = '#';
            // buyLink.textContent = 'BUY';
    
            const buyDiv = document.createElement('div');
            buyDiv.classList.add('buy-cart');
            buyDiv.appendChild(price);
            // buyDiv.appendChild(buyLink);
    
            card.appendChild(title);
            card.appendChild(imageContainer);
            card.appendChild(buyDiv);
    
            return card;
        }
    
        // Appel initial pour afficher les Pokémon du stockage local
        displayLocalStoragePokemon();
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const localStorageTable = document.getElementById('localStorageTable');
        const totalAmountSpan = document.getElementById('totalAmount');
    
        // Fonction pour afficher les Pokémon du stockage local sous forme de tableau
        function displayLocalStoragePokemon() {
            const localStorageData = JSON.parse(localStorage.getItem('selectedPokemon')) || [];
    
            // Créer le tableau
            const table = document.createElement('table');
            table.classList.add('pokemon-table');
    
            // ... (le reste de votre code pour afficher le tableau)
    
            // Calculer et afficher le total des prix
            const totalAmount = calculateTotalAmount(localStorageData);
            totalAmountSpan.textContent = totalAmount;
        }
    
        // Fonction pour calculer le total des prix
        function calculateTotalAmount(pokemonDataList) {
            let total = 0;
    
            pokemonDataList.forEach((pokemonData) => {
                total += pokemonData.base_experience;
            });
    
            return total;
        }
    
        // Appel initial pour afficher les Pokémon du stockage local
        displayLocalStoragePokemon();
    });

    document.addEventListener('DOMContentLoaded', () => {
        const localStorageTable = document.getElementById('localStorageTable');
        const totalAmountSpan = document.getElementById('totalAmount');
        const deleteAllLink = document.getElementById('deleteAllLink');
    
        // Fonction pour afficher les Pokémon du stockage local sous forme de tableau
        function displayLocalStoragePokemon() {
            const localStorageData = JSON.parse(localStorage.getItem('selectedPokemon')) || [];
    
            // Calculer et afficher le total des prix
            const totalAmount = calculateTotalAmount(localStorageData);
            totalAmountSpan.textContent = totalAmount;
    
            // Ajouter le gestionnaire d'événements pour la suppression de tous les éléments
            
        }
        deleteAllLink.addEventListener('click', () => {
            window.location.reload();
            localStorage.clear();
        });

    });
    
    
    
    
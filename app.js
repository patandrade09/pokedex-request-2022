
document.querySelector("#btnPokemon").addEventListener('click', requestPokemon);
document.querySelector("#searchPokemon").addEventListener('keyup', detectKey);

function detectKey(e) {
    if (e.key === 'Enter') {
        document.querySelector("#btnPokemon").click();
    }
}

function requestPokemon() {
    
    let nameInput = document.querySelector("#searchPokemon").value;
    let url = `https://pokeapi.co/api/v2/pokemon/${nameInput}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        
        console.log(data)

        const name = data.name[0].toUpperCase() + data.name.substr(1)
        const abilityName = data.abilities
        const abilityPokemon = document.querySelector("#abilitiePokemon")
        const abilityHidden = document.querySelector("#abilitieHiddenPokemon")
        const typeName = data.types
        const typePokemon = document.querySelector("#typePokemon");
        
        typePokemon.innerText = "Type: " 
        typeName.forEach(tipo => {
            const tipoPokemon = createType(tipo);
            typePokemon.appendChild(tipoPokemon)
        });
        
        function createType(tipo) { 
            const span = document.createElement('span');
            span.innerText = tipo.type.name + " "
            return span
        }

        abilityPokemon.innerText = "Ability: " 
        abilityHidden.innerText = "Ability Hidden: "
        abilityName.forEach(habilidade => {
            const habilidadePokemon = createAbility(habilidade);
            if (habilidade.is_hidden) {
                abilityHidden.appendChild(habilidadePokemon)
            } else {
                abilityPokemon.appendChild(habilidadePokemon)
            }
        });
        
        function createAbility(habilidade) { 
            const span = document.createElement('span');
            span.innerText = habilidade.ability.name + " "
            return span
        }

        document.querySelector("#resultPokemon").innerText = 'Name: ' + name
        document.querySelector("#idPokemon").innerText = 'ID: ' + data.id
        document.querySelector("#imgPokemon").innerHTML = `<img src="${data.sprites.front_default}" />`

        
    })
    .catch((erro) => {
        console.log("This Pokemon has not found", erro)
        document.querySelector("#resultPokemon").innerText = "This Pokemon has not found"
        document.querySelector("#idPokemon").innerText = '' 
        document.querySelector("#abilitiePokemon").innerText = '' 
        document.querySelector("#abilitieHiddenPokemon").innerText = ''
        document.querySelector("#imgPokemon").innerHTML = ''
        typePokemon.innerText = ""
    })
    
}

requestPokemon()
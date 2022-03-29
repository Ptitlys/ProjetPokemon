class Pokemon{
    static all_pokemons = [];

    constructor(tab,tab_type,tab_moves,generation){
        this.base_attack = tab['base_attack'];
        this.base_defense = tab['base_defense'];
        this.base_stamina = tab['base_stamina'];
        this.pokemon_name = tab['pokemon_name'];
        this.id = tab['pokemon_id'];
        this.generation = generation;

        switch(String(this.id).split('').length){
            case 1:
                this.image="https://www.adl-web.fr/pokemon-base/images/00"+tab['pokemon_id']+".png";
                this.miniature = "https://www.adl-web.fr/pokemon-base/thumbnails/00"+tab['pokemon_id']+".png";
            break;
            case 2:
                this.image="https://www.adl-web.fr/pokemon-base/images/0"+tab['pokemon_id']+".png";
                this.miniature = "https://www.adl-web.fr/pokemon-base/thumbnails/0"+tab['pokemon_id']+".png";
            break;
            case 3:
                this.image="https://www.adl-web.fr/pokemon-base/images/"+tab['pokemon_id']+".png";
                this.miniature = "https://www.adl-web.fr/pokemon-base/thumbnails/"+tab['pokemon_id']+".png";
                break;
        }

        if(tab_type.length == 1){
            this.type1 = tab_type[0];
            this.type2 = "";
        }
        else{
            this.type1 = tab_type[0];
            this.type2 = tab_type[1];
        }
        
        this.move_set = tab_moves;
    }

    getType(){
        let tab_typ = [];
        tab_typ.push(this.type1["type"]);
        tab_typ.push(this.type2["type"]);
        return tab_typ;
    }

    getAttack(){
        let tab_move = [];
        for(let i = 0; i < this.move_set.length; i++){
           tab_move =  this.move_set[i]["name"];
        }
        return tab_move;
       
    }

    getVulnerability(type){
        let coeff;
        if(this.type2 == ""){
            coeff = type_effectiveness[type][this.type1["type"]];

        }
        else{
            coeff= type_effectiveness[type][this.type1["type"]] * type_effectiveness[type][this.type2["type"]];
        }
        return coeff
    }

    toString(){
        return " Pokemon numero: " + this.id + " nom: " + this.pokemon_name + " attaque de base: " + this.base_attack + " defense de base: " + this.base_defense + " stamina de base: " + this.base_stamina + "</br>" + this.type1 + ", " + this.type2 + "</br> Generation: " + this.generation;
    }
    

    
    static import_pokemon(){
        Type.import_type();
        Attack.import_attacks();


        let tab_type = [];
        let tab_moves = [];
        let tab_moves_name = [];

        
        
        for (let i = 0; i < pokemons.length; i++) {
            tab_moves = [];
            tab_moves_name = [];
            tab_type=[];
            let generation = "";

            if(pokemons[i]['form'] == "Normal"){

                //chercher la generation pour l'attribuer
                Object.keys(pokemon_generation).forEach(tab_generation => {
                    pokemon_generation[tab_generation].forEach(gen =>{
                        if(gen["id"] == pokemons[i]["pokemon_id"]){
                            generation = gen["generation_number"];
                        }
                    });
                });

                    //chercher le type pour l'attribuer
                        if(pokemon_type[i]["pokemon_id"] == pokemons[i]["pokemon_id"] && pokemon_type[i]["form"] == "Normal"){
                            tab_type = pokemon_type[i]["type"];

                            //Ajout objet Type aux tableau type d'un pokemon
                            for(let k = 0; k < tab_type.length; k++){
                                tab_type[k] = Type.all_types[tab_type[k]];
                            }
                        }
                        
                    //recuperer nom attaque du pokemon
                        for(let j = 0; j < pokemon_moves.length; j++){
                            if(pokemons[i]["pokemon_id"] == pokemon_moves[j]["pokemon_id"] && pokemon_moves[j]["form"] == "Normal" ){
                                tab_moves_name["charged_moves"] = pokemon_moves[j]["charged_moves"];
                                tab_moves_name["fast_moves"] = pokemon_moves[j]["fast_moves"];
                            }
                        }

                        for(let k = 0; k < tab_moves_name["charged_moves"].length; k++){
                            for(let j = 0; j < charged_moves.length; j++){
                                if(charged_moves[j]["name"] == tab_moves_name["charged_moves"][k]){
                                    tab_moves.push(charged_moves[j]);
                                }
                            }
                        }

                        for(let k = 0; k < tab_moves_name["fast_moves"].length; k++){
                            for(let l = 0; l < fast_moves.length; l++){
                                if(fast_moves[l]["name"] == tab_moves_name["fast_moves"][k]){
                                    tab_moves.push(fast_moves[l]);
                                }  
                            }
                        }
                        
                    //Creer le pokemon
                    let pokemon = new Pokemon(pokemons[i],tab_type,tab_moves,generation);
                    this.all_pokemons[pokemons[i]['pokemon_id']] = pokemon;   
            }  
        }
    }
}

class Type{
    static all_types = [];

    constructor(type, tab_effectiveness){
        this.type = type;
       
        this.bug = tab_effectiveness[this.type]["Bug"];
        this.dark = tab_effectiveness[this.type]["Dark"];
        this.dragon = tab_effectiveness[this.type]["Dragon"];
        this.electric = tab_effectiveness[this.type]["Electric"];
        this.fairy = tab_effectiveness[this.type]["Fairy"];
        this.fighting = tab_effectiveness[this.type]["Fighting"];
        this.fire = tab_effectiveness[this.type]["Fire"];
        this.flying = tab_effectiveness[this.type]["Flying"];
        this.ghost = tab_effectiveness[this.type]["Ghost"];
        this.grass = tab_effectiveness[this.type]["Grass"];
        this.ground = tab_effectiveness[this.type]["Ground"];
        this.ice = tab_effectiveness[this.type]["Ice"];
        this.normal = tab_effectiveness[this.type]["Normal"];
        this.poison = tab_effectiveness[this.type]["Poison"];
        this.psychic = tab_effectiveness[this.type]["Psychic"];
        this.rock = tab_effectiveness[this.type]["Rock"];
        this.steel = tab_effectiveness[this.type]["Steel"];
        this.water = tab_effectiveness[this.type]["Water"];
    }

    toString(){
        return "Type du pokémon: " + this.type + " Coefficients selon le type : </br>" + "Insecte: " + this.bug + "</br>Ténèbre: " + this.dark + "</br>Dragon: " + this.dragon +"</br>Electricité: " + this.electric + "</br>Fée: " + this.fairy + "</br>Combat: " + this.fighting + "</br>Feu: " + this.fire + "</br>Vol: " + this.flying + "</br>Spectre: " + this.ghost + "</br>Plante: " + this.grass +"</br>Sol: "+ this.ground + "</br>Glace: " + this.ice + "</br>Normal: " + this.normal + "</br>Poison: " + this.poison + "</br>Psy: " + this.psychic + "</br>Roche: " + this.rock + "</br>Acier: " + this.steel + "</br>Eau: " + this.water + "</br>";
        
    }

    static import_type(){
        let keys = Object.keys(type_effectiveness);
        for (let i = 0; i < Object.keys(type_effectiveness).length; i++) {
            let new_type = new Type(keys[i], type_effectiveness);
            this.all_types[keys[i]] = new_type;   
        }
    }
    
}

class Attack{
    static all_moves = [];

   
    constructor(move){
        this.name = move["name"];
        this.move_id = move["move_id"];
        this.critical_chance = move["critical_chance"];
        this.duration = move["duration"];
        this.energy_delta = move["energy_delta"];
        this.power = move["power"];
        this.stamina_loss_scaler= move["stamina_loss_scaler"];
        this.type = move["type"];
    }

    toString(){
        return "<br>Nom : "+this.name+"<br>ID : "+this.move_id+"<br>Critical chance : "+this.critical_chance+"<br>Duration : "+this.duration+"<br>Energy delta : "+this.energy_delta+"<br>Power : "+this.power+"<br>Stamina loss scaler : "+this.stamina_loss_scaler+"<br>Type : "+this.type+"<br>";
    }

    //On recherche si l'attaque est déjà dans le tableau all_moves
    static moveTrouve(move){
        let trouve = false;
        Attack.all_moves.forEach(moveCourant =>{
            if(moveCourant["name"] == move["name"]) trouve = true;
        });
        return trouve
    }

    static import_attacks(){
        //Importer toutes les charged moves et les mettre dans le tableau all_moves
        for(let j=0;j<charged_moves.length;j++){
            let moveCourant = charged_moves[j];
            let monAtt = new Attack(moveCourant);
            if(!Attack.moveTrouve(monAtt)) Attack.all_moves.push(monAtt); 
        }

        //Importer tous les fast moves et les mettre dans le tableau all_moves
        for(let j=0;j<fast_moves.length;j++){
            let moveCourant = fast_moves[j];
            let monAtt = new Attack(moveCourant);
            if(!Attack.moveTrouve(monAtt)) Attack.all_moves.push(monAtt);
        }
    }

    getType(){
        return this.type;
    }
}

function getPokemonsByType(type){
    let tab_pokemon = [];
    Pokemon.all_pokemons.forEach(pokemon => {
        pokemon.getType().forEach(poke_type => {
            if(poke_type == type){
                tab_pokemon.push(pokemon);
            }
        });
       
    });
    return tab_pokemon;
}

function getPokemonsByAttack(attack){
    let tab_pokemon = [];
    Pokemon.all_pokemons.forEach(pokemon => {
        poke_attack = pokemon.getAttack();
            if(poke_attack == attack){
                tab_pokemon.push(pokemon);
            }  
    });
    return tab_pokemon;
}

function getAttackByType(type){
    let tab_attack = [];
    Attack.all_moves.forEach(attaque => {
        if(attaque.getType() == type){
            tab_attack.push(attaque);
        }
    })
    return tab_attack;
}
//On crée les fonctions qui vont permettre de comparer et qui seront utilisés par les trieurs 
function SortByStamina(x, y){
    if (x.base_stamina > y.base_stamina) {return -1;}
    if (x.base_stamina < y.base_stamina) {return  1;}
    return 0;
}
function SortByName(x, y) {
    if (x.pokemon_name < y.pokemon_name) { return -1; }
    if (x.pokemon_name > y.pokemon_name) { return 1; }
    return 0;
}
//On crée les fonctions qui vont trier
function sortPokemonByStamina(){
    var s = Pokemon.all_pokemons.sort(SortByStamina);
    console.log(s);
}

function sortPokemonByName() {
    var s = Pokemon.all_pokemons.sort(SortByName);
    console.log(s);
}

function getWeakestEnnemy(attack){
    let weakest = [];
    let weakest_coeff = 0;
    
    Attack.all_moves.forEach(attaque => {
        
        if(attaque["name"] == attack){
            //trouver coeff le plus haut
            Pokemon.all_pokemons.forEach(pokemon =>{
                if(pokemon.getVulnerability(attaque["type"]) > weakest_coeff){
                    weakest_coeff = pokemon.getVulnerability(attaque["type"]);
                }
            });
            
            //ajouter pokemon au coeff le plus haut
            Pokemon.all_pokemons.forEach(pokemon =>{
                if(pokemon.getVulnerability(attaque["type"]) == weakest_coeff){
                    weakest.push(pokemon);
                }
            });
        }
    }  
    );
    
    return weakest;
}

function getStrongestEnnemy(attack){
    let strongest = [];
    let strongest_coeff = 100;

    Attack.all_moves.forEach(attaque => {
        if(attaque["name"] == attack){
            //trouver le coeff le plus bas
            Pokemon.all_pokemons.forEach(pokemon =>{
                if(pokemon.getVulnerability(attaque["type"]) < strongest_coeff){
                    strongest_coeff = pokemon.getVulnerability(attaque["type"]);
                }
            });
            
            //ajouter pokemon au coeff le plus bas
            Pokemon.all_pokemons.forEach(pokemon =>{
                if(pokemon.getVulnerability(attaque["type"]) == strongest_coeff){
                    strongest.push(pokemon);
                }
            });
        }
    }
    );
    return strongest;
}

Pokemon.import_pokemon();
console.log(Pokemon.all_pokemons);

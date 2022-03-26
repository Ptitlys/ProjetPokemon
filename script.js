class Pokemon{
    static all_pokemons = [];

    constructor(tab,tab_type,tab_moves){
        this.base_attack = tab['base_attack'];
        this.base_defense = tab['base_defense'];
        this.base_stamina = tab['base_stamina'];
        this.pokemon_name = tab['pokemon_name'];
        this.id = tab['pokemon_id'];

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

    static getType(){
        for(var key in Type.all_types){
            var value = Type.all_types[key];
        }
    }

    toString(){
        return " Pokemon numero: " + this.id + " nom: " + this.pokemon_name + " attaque de base: " + this.base_attack + " defense de base: " + this.base_defense + " stamina de base: " + this.base_stamina + "</br>" + this.type1 + ", " + this.type2 + "</br>";
    }
    //On recherche si l'attaque est déjà dans le tableau all_moves
    static moveTrouve(move){
        let trouve = false;
        Attack.all_moves.forEach(moveCourant =>{
            if(moveCourant["name"] == move["name"]) trouve = true;
        });
        return trouve
    }
    
    static import_pokemon(){
        let tab_type = [];
        let tab_moves = [];
        //Importer toutes les charged moves et les mettre dans le tableau all_moves
        for(let j=0;j<charged_moves.length;j++){
            let moveCourant = charged_moves[j];
            let monAtt = new Attack(moveCourant);
            if(!this.moveTrouve(monAtt)) Attack.all_moves.push(monAtt); 
        }

        //Importer tous les fast moves et les mettre dans le tableau all_moves
        for(let j=0;j<fast_moves.length;j++){
            let moveCourant = fast_moves[j];
            let monAtt = new Attack(moveCourant);
            if(!this.moveTrouve(monAtt)) Attack.all_moves.push(monAtt);
        }
        
        for (let i = 0; i < pokemons.length; i++) {
            tab_type=[];
            if(pokemons[i]['form'] == "Normal"){

                    //chercher le type pour l'attribuer
                        if(pokemon_type[i]["pokemon_id"] == pokemons[i]["pokemon_id"] && pokemon_type[i]["form"] == "Normal"){
                            tab_type = pokemon_type[i]["type"];

                            //Ajout objet Type aux tableau type d'un pokemon
                            for(let k = 0; k < tab_type.length; k++){
                                tab_type[k] = Type.all_types[tab_type[k]];
                            }
                        }

                    
                    
                    //Creer le pokemon
                    let pokemon = new Pokemon(pokemons[i],tab_type,tab_moves);
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
}
Pokemon.import_pokemon();

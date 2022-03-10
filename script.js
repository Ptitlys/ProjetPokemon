class Pokemon{
    static all_pokemons = [];

    constructor(tab){
        this.base_attack = tab['base_attack'];
        this.base_defense = tab['base_defense'];
        this.base_stamina = tab['base_stamina'];
        this.pokemon_name = tab['pokemon_name'];
        this.id = tab['pokemon_id'];
        
    }

    toString(){
        return " Pokemon numero: " + this.id + " nom: " + this.pokemon_name + " attaque de base: " + this.base_attack + " defense de base: " + this.base_defense + " stamina de base: " + this.base_stamina + "</br>";
    }

    static import_pokemon(){
        for (let i = 0; i < pokemons.length; i++) {
            if(pokemons[i]['form'] == "Normal"){
                    let pokemon = new Pokemon(pokemons[i]);
                    this.all_pokemons[pokemons[i]['pokemon_id']] = pokemon;
            }  
        }
    }


}

class Type{
    static all_types = [];

    static import_type(){
        for (let i = 0; i < type_effectiveness.length; i++) {
                console.log(type_effectiveness);
            
              
        }
    }
}


Pokemon.import_pokemon();
Type.import_type();

document.write(Pokemon.all_pokemons);


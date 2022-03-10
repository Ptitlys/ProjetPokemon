class Pokemon{
        
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


}

class Type{
    
}
let all_pokemons =[];

function import_pokemon(){
    for (let i = 0; i < pokemons.length; i++) {
        if(pokemons[i]['form'] == "Normal"){
                pokemon = new Pokemon(pokemons[i]);
                all_pokemons[pokemons[i]['pokemon_id']] = pokemon;
        }  
    }
}

import_pokemon();
document.write(all_pokemons);

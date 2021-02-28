import IFilm from 'src/interfaces/IFilm';
import IFilmSW from 'src/interfaces/Swapi/IFilm';

import IHomePlanet from 'src/interfaces/IHomePlanet';
import IPerson from 'src/interfaces/IPerson';
import ISpecies from 'src/interfaces/ISpecies';
import IPeople from 'src/interfaces/Swapi/IPeople';

export default class Person implements IPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    gender: string;
    birth_year: string;
    home_planet?: IHomePlanet | undefined = undefined;
    species?: ISpecies | undefined = undefined;
    films?: IFilm[] | undefined = [];
    constructor(starWarsCharacter: IPeople, homeworld: IHomePlanet, personSpecies: ISpecies[] = [], films: IFilmSW[] = []) {
        if (!starWarsCharacter) throw new Error('Unable to create star war character');

        const { name, height, mass, hair_color, skin_color, gender, birth_year } = starWarsCharacter;
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.hair_color = hair_color;
        this.skin_color = skin_color;
        this.gender = gender;
        this.birth_year = birth_year;
        if (homeworld) {
            const { name, terrain, population } = homeworld;
            this.home_planet = { name, terrain, population };
        }
        if (personSpecies && personSpecies.length) {
            const { name, average_lifespan, language, classification } = personSpecies[0];
            this.species = { name, classification, average_lifespan, language };
        }
        if (films && films.length) {
            this.films = films.map(({ title, director, producer, release_date }) => {
                return {
                    title,
                    director,
                    producers: (producer && producer.split(',').map((item) => item.trim())) || [],
                    release_date
                };
            });
        }
    }
}

import IHomePlanet from './IHomePlanet';
import ISpecies from './ISpecies';
import IFilm from './IFilm';

interface IPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    gender: string;
    birth_year: string;
    home_planet?: IHomePlanet;
    species?: ISpecies;
    films?: IFilm[];
}
export default IPerson;

import IHomePlanet from 'src/interfaces/IHomePlanet';
import IPerson from 'src/interfaces/IPerson';
import ISpecies from 'src/interfaces/ISpecies';
import IFilmSW from 'src/interfaces/Swapi/IFilm';
import IPeople from 'src/interfaces/Swapi/IPeople';
import Person from 'src/models/Person';

export function extractIdFromEntityUrl(url: string): number {
    if (!url) throw new Error('Invalid url');
    // Trim the trailing slash off
    const match = url.match(/\/(\d+)\/$/);
    if (!match || match.length < 2) {
        throw new Error('Could not extract entity ID from url');
    }

    return parseInt(match[1], 10);
}

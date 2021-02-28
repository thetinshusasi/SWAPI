import IPeople from '../interfaces/Swapi/IPeople';
import IPerson from '../interfaces/IPerson';
import IPaginatedResponse from '../interfaces/IPaginatedResponse';
import PersonService from '../service/people.service';
import FilmsService from '../service/films.service';
import PlanetsService from '../service/planets.service';
import SpeciesService from '../service/species.service';

import { extractIdFromEntityUrl } from '../utils';
import ISpecies from '../interfaces/ISpecies';
import IFilmSW from '../interfaces/Swapi/IFilm';
import IHomePlanet from '../interfaces/IHomePlanet';
import Person from '../models/Person';
export interface IPersonResolver {
    getAll: (search?: string) => Promise<IPeople[] | void>;
    getById: (id: string) => Promise<IPerson | void>;
    getAllNames: (search?: string) => Promise<{ id: number; name: string }[] | void>;
}

export default class PersonResolver implements IPersonResolver {
    getAll = async (search?: string): Promise<IPeople[]> => {
        try {
            const data: IPaginatedResponse<IPeople> = await PersonService.getAll<IPaginatedResponse<IPeople>>(search);
            if (!data || !data.results || !data.results.length) return [];

            const { results, next, count: totalCount } = data;
            if (!next) return results;
            const totalPages = (totalCount && Math.ceil(totalCount / results.length)) || 0;
            let currentPage = 2;
            const promiseList = [];
            while (currentPage <= totalPages) {
                promiseList.push(PersonService.getAll<IPaginatedResponse<IPeople>>(search, currentPage));
                currentPage++;
            }
            const responseList = await Promise.all(promiseList);
            let persons: IPeople[] = [...results];
            responseList &&
                responseList.forEach((res) => {
                    if (res && res.results && res.results.length) persons = persons.concat(res.results);
                });
            return persons;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    getById = async (id: string): Promise<IPerson> => {
        try {
            if (!id) throw new Error('invalid id');
            const data: IPeople = await PersonService.getById<IPeople>(id);
            if (!data) throw new Error('invalid id');
            const { homeworld = undefined, species = undefined, films = undefined } = data;
            let homeworldPromise: Promise<IHomePlanet> | any = undefined;
            if (homeworld) {
                const homeworldId = extractIdFromEntityUrl(homeworld);
                homeworldPromise = PlanetsService.getById(`${homeworldId}`);
            }

            let speciesPromiseAll: Promise<ISpecies[]> | ISpecies[] = [];
            if (species && species.length) {
                const speciesPromises: Promise<ISpecies>[] = [];
                const speciesIds: number[] = species.map((item) => extractIdFromEntityUrl(item));
                speciesIds.forEach((item) => {
                    const promise: Promise<ISpecies> = SpeciesService.getById(`${item}`);
                    if (promise) speciesPromises.push(promise);
                });
                speciesPromiseAll = Promise.all(speciesPromises);
            }

            let filmsPromiseAll: Promise<IFilmSW[]> | IFilmSW[] = [];

            if (films && films.length) {
                const filmsPromises: Promise<IFilmSW>[] = [];
                const filmIds: number[] = films.map((item) => extractIdFromEntityUrl(item));
                filmIds.forEach((item) => {
                    const promise: Promise<IFilmSW> = FilmsService.getById(`${item}`);
                    if (promise) filmsPromises.push(promise);
                });
                filmsPromiseAll = Promise.all(filmsPromises);
            }
            const personInfo = await Promise.all([homeworldPromise, speciesPromiseAll, filmsPromiseAll]);
            if (!personInfo) throw new Error('invalid data');

            const [homeworkRes, speciesRes = [], filmsRes = []] = personInfo;
            const person: Person = new Person(data, homeworkRes, speciesRes, filmsRes);

            return person;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    getAllNames = async (search?: string): Promise<{ id: number; name: string }[]> => {
        try {
            const data: IPeople[] = await this.getAll(search);
            return data.map((item, index) => {
                return {
                    id: index + 1,
                    name: item.name
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

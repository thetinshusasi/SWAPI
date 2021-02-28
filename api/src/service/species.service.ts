import { get } from './base.service';
const basePath = 'species';

export function getAll<T>(search?: string, page = 1): Promise<T | void> | undefined {
    let url = `${basePath}?page=${page}`;
    if (search) url += `&name=${search}`;
    return get<T>(`${url}`)
        ?.then((res) => res.data)
        .catch((err) => console.log(err));
}
export function getById<T>(id: string): Promise<T> {
    if (!id) throw new Error('invalid id');
    const url = `${basePath}/${id}`;

    return get<T>(`${url}`)
        ?.then((res) => res.data)
        .catch((err) => console.log(err));
}

export default {
    getAll,
    getById
};

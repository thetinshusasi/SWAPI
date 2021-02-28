interface IPaginatedResponse<T> {
    count: number | null;
    previous: string | null;
    next: string | null;
    results: T[];
}
export default IPaginatedResponse;

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum MovieType {
    popular = "popular",
    top_rated = "top_rated",
    upcoming = "upcoming",
    now_playing = "now_playing",
}
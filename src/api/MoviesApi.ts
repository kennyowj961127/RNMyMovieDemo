import axios from "../lib/axios";
import { TMDB_API_KEY } from "@env"
import { action } from "mobx";
const tmdbApiKeyHeaders = {
    'Authorization': `Bearer ${TMDB_API_KEY}`,
}

export const getPopularMovies = action(async (page: number) => {
    //console.log('tmdbApiKeyHeaders', tmdbApiKeyHeaders);
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        // console.log('response', response.data);
        return response.data;
    } catch (error) {
        console.error('getPopularMovies error', error);
        return error;
    }
})

export const getNowPlayingMovies = action(async (page: number) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        return response.data;
    } catch (error) {
        console.error('getNowPlayingMovies error', error);
        return error;
    }
})

export const getTopRatedMovies = action(async (page: number) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        return response.data;
    } catch (error) {
        console.error('getTopRatedMovies error', error);
        return error;
    }
})

export const getUpcomingMovies = action(async (page: number) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            params: {
                page
            },
            headers: tmdbApiKeyHeaders
        });
        return response.data;
    } catch (error) {
        console.error('getUpcomingMovies error', error);
        return error;
    }
})

export const getMovieDetails = action(async (movieId: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: tmdbApiKeyHeaders
        });
        return response.data;

    } catch (error) {
        console.error('getMovieDetails error', error);
        return error;
    }
})

export const searchMovies = action(async (query: string, page: number) => {
    try {
        // console.log('searchMovies', query, page);
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query,
                page
            },
            headers: tmdbApiKeyHeaders
        });
        return response.data;
    } catch (error) {
        console.error('searchMovies error', error);
        return error;
    }
})
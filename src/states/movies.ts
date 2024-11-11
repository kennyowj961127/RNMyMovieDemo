import { makeAutoObservable } from "mobx";
import { makeObservable, observable, action, computed, runInAction } from "mobx";
import { Movie, MovieType } from "../types/movies.d";
import { getPopularMovies, 
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieDetails,
    searchMovies } from "../api/MoviesApi";
import { makePersistable, clearPersistedStore } from "mobx-persist-store";
import { storage } from "../../App";

class Movies {
    popularMovies: Movie[] = [];
    selectedMovie: Movie | null = null;
    movieType: MovieType = MovieType.popular;
    movieTypes = [
        { label: "Popular", value: MovieType.popular },
        { label: "Now Playing", value: MovieType.now_playing },
        { label: "Top Rated", value: MovieType.top_rated },
        { label: "Upcoming", value: MovieType.upcoming },
    ];
    favoriteMovies: Movie[] = [];
    searchQuery: string = "";
    searchResults: Movie[] = [];

    constructor() {
        makeObservable(this, {
            popularMovies: observable,
            selectedMovie: observable,
            movieType: observable,
            favoriteMovies: observable,
            searchQuery: observable,
            searchResults: observable,
            selectedMovieDetails: computed,
            fetchPopularMovies: action,
            fetchNowPlayingMovies: action,
            fetchTopRatedMovies: action,
            fetchUpcomingMovies: action,
            fetchMovieDetails: action,
            setSelectedMovie: action,
            resetSelectedMovie: action,
            clearStoredData: action,
            setMovieType: action,
            getMovieType: action,
            getFavoriteMovies: action,
            addFavoriteMovie: action,
            removeFavoriteMovie: action,
            isFavoriteMovie: action,
            getFavoriteMovieCount: action,
            getFavoriteMovieIds: action,
            searchMovie: action,
            setSearchQuery: action,
            searchResultsCount: computed,
            searchResultsList: computed,
        });
        makePersistable(this, {
            name: "Movies",
            properties: [
                "popularMovies", 
                "selectedMovie", 
                "movieType",
                "favoriteMovies"],
        }).then(
            action((persistStore) => {
                //console.log("persistStore.isHydrated", persistStore.isHydrated);
            })
        );
    }

    async clearStoredData() {
        storage.getAllKeys().forEach((key) => {
            if (key.includes("Movies")){
                storage.delete(key);
            }
        });
        await clearPersistedStore(this);
      }

    async fetchPopularMovies(page: number = 1) {
        const movies = await getPopularMovies(page);
        runInAction(() => {
            this.popularMovies = movies;
        });
    }

    async fetchNowPlayingMovies(page: number = 1) {
        const movies = await getNowPlayingMovies(page);
        runInAction(() => {
            this.popularMovies = movies;
        });
    }

    async fetchTopRatedMovies(page: number = 1) {
        const movies = await getTopRatedMovies(page);
        runInAction(() => {
            this.popularMovies = movies;
        });
    }

    async fetchUpcomingMovies(page: number = 1) {
        const movies = await getUpcomingMovies(page);
        runInAction(() => {
            this.popularMovies = movies;
        });
    }

    async fetchMovieDetails(movieId: string) {
        const movie = await getMovieDetails(movieId);
        //console.log("fetchMovieDetails", movie);
        runInAction(() => {
            this.selectedMovie = movie;
        });
    }

    setSelectedMovie(movie: Movie) {
        this.selectedMovie = movie;
    }

    resetSelectedMovie() {
        this.selectedMovie = null;
    }

    get selectedMovieDetails() {
        return this.selectedMovie;
    }

    setMovieType(type: MovieType) {
        //console.log("setMovieType", type);
        this.movieType = type;
    }

    getMovieType() {
        return this.movieType;
    }

    getFavoriteMovies() {
        return this.favoriteMovies;
    }

    addFavoriteMovie(movie: Movie) {
        //console.log("addFavoriteMovie", movie);
        this.favoriteMovies.push(movie);
    }

    removeFavoriteMovie(movie: Movie) {
        //console.log("removeFavoriteMovie", movie);
        this.favoriteMovies = this.favoriteMovies.filter(
            (favMovie) => favMovie.id !== movie.id
        );
    }

    isFavoriteMovie(movie: Movie) {
        // console.log("isFavoriteMovie", movie);
        // console.log("this.favoriteMovies", this.favoriteMovies);
        return this.favoriteMovies.some((favMovie) => favMovie.id === movie.id);
    }

    getFavoriteMovieCount() {
        return this.favoriteMovies.length;
    }

    getFavoriteMovieIds() {
        return this.favoriteMovies.map((movie) => movie.id);
    }

    async searchMovie(page: number = 1) {
        const movies = await searchMovies(this.searchQuery, page);
        runInAction(() => {
            //console.log(`Search Movies ${page}`, movies);
            this.searchResults = movies;
        });
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    get searchResultsCount() {
        return this.searchResults.length;
    }

    get searchResultsList() {
        return this.searchResults;
    }

    resetSearchResults() {
        this.searchResults = [];
    }

}

export const movies = new Movies();
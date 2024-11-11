import React, { useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/navigation";
import { movies } from "../../states/movies";
import { Movie } from "../../types/movies";
import FastImage from "react-native-fast-image";
import Icon from "react-native-easy-icon";
import { useToast } from "react-native-toast-notifications";

const MovieDetail = observer((): React.JSX.Element => {
    const navigation = useNavigation<NavigationProps>();
    const myMovies = movies;
    const toast = useToast();
    const { selectedMovie, favoriteMovies } = myMovies;
    const [loading, setLoading] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);
    navigation.setOptions({
        title: selectedMovie?.title,
        headerShown: true,
        headerRight: () => (
            <TouchableOpacity
                onPress={() => {
                    if (isFavorite) {
                        myMovies.removeFavoriteMovie(selectedMovie);
                        setIsFavorite(false);
                        toast.hideAll();
                        toast.show("Removed from favorites", {
                            type: "danger",
                            placement: "bottom",
                            duration: 4000,
                            animationType: "zoom-in",
                        });
                    } else {
                        myMovies.addFavoriteMovie(selectedMovie);
                        setIsFavorite(true);
                        toast.hideAll();
                        toast.show("Added to favorites", {
                            type: "success",
                            placement: "bottom",
                            duration: 4000,
                            animationType: "slide-in",
                        });
                    }
                }}
            >
                <Icon
                    name="heart"
                    size={20}
                    color={isFavorite ? "red" : "gray"}
                    type="antdesign"
                />
            </TouchableOpacity>
        ),
    });

    useEffect(() => {
        return () => {
            // myMovies.resetSelectedMovie();
            toast.hideAll();
        }
    }, []);

    useEffect(() => {
        //console.log("selectedMovie", selectedMovie);
        if (selectedMovie) {
            setIsFavorite(myMovies.isFavoriteMovie(selectedMovie));
        }
    }, [selectedMovie]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        width: "100%",
                        height: 300,
                        backgroundColor: 'black'
                    }}>
                        <FastImage
                            source={{ uri: `https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}` }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={styles.title}>
                            {selectedMovie?.title}
                            {" ( "}
                            {(selectedMovie?.release_date)?.split("-")[0]}
                            {" ) "}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 10,
                        }}>
                            {selectedMovie?.genres?.map((genre) => {
                                return (
                                    <Text
                                        style={styles.genre}
                                        key={genre.id}>{genre.name}</Text>
                                );
                            })}
                        </View>
                        <Text style={styles.title}>
                            Story Line
                        </Text>
                        <Text style={styles.overview}>{selectedMovie?.overview}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    genre: {
        fontSize: 16,
        marginTop: 10,
        backgroundColor: "lightgray",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    overview: {
        marginTop: 10,
        fontSize: 16,
    },
    buttonText: {
        color: "white",
    },
});

export default MovieDetail;
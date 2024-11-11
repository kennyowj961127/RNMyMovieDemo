import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../../types/navigation";
import { movies } from "../../states/movies";
import { observer } from "mobx-react-lite";
import FastImage from "react-native-fast-image";
const Profile = observer((): React.JSX.Element => {
    const navigation = useNavigation<NavigationProps>();
    const myMovies = movies;
    const { favoriteMovies } = myMovies;

    return (
        <SafeAreaView>
            {/* Show My Movie Bookmark List */}
            <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    margin: 10
                }}>My Favorite Movies {`(${myMovies?.getFavoriteMovieCount()})`}</Text>
                {favoriteMovies.map((movie) => (
                    <TouchableOpacity
                        style={{
                            margin: 10,
                            flexDirection: "row",

                        }}
                        key={movie.id}
                        onPress={() => {
                            myMovies.setSelectedMovie(movie);
                            navigation.navigate("MovieDetail");
                        }}
                    >
                        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={{
                                width: 100,
                                height: 150,
                                borderRadius: 10
                            }} />
                        <View style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                        }}>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 16,
                            }}>
                                {movie.title}
                                {"\n"}
                                {movie.release_date.split("-")[0]}
                            </Text>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 12,
                            }}>
                                {movie.overview}
                            </Text>
                        </View>

                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );
})

export default memo(Profile);
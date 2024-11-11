import React from "react";
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    TextInput,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/navigation";
import { movies } from "../../states/movies";
import { Movie } from "../../types/movies";
import FastImage from "react-native-fast-image";


const Search = observer((): React.JSX.Element => {
    const navigation = useNavigation<NavigationProps>();
    const myMovies = movies;
    const { searchQuery, searchResults } = myMovies;
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState([]);


    React.useEffect(() => {
        if (searchResults?.results && searchResults?.results.length > 0) {
            setResults([...results, ...searchResults.results]);
        }
        setLoading(false);
    }, [searchResults]);

    React.useEffect(() => {
        return () => {
            myMovies.setSearchQuery("");
            myMovies.resetSearchResults();
        }
    }, []);

    const onEndReached = () => {
        if (searchResults?.total_pages && page < searchResults.total_pages) {
            setPage(page + 1);
            myMovies.searchMovie(page + 1);
        }
    }

    const onRefresh = () => {
        setResults([]);
        setPage(1);
        myMovies.searchMovie(1);
    }

    const renderItem = ({ item }: { item: Movie }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    myMovies.setSelectedMovie(item);
                    myMovies.fetchMovieDetails(item?.id.toString());
                    navigation.navigate("MovieDetail");
                }}
            >
                <FastImage
                    source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
                    style={styles.image}
                    defaultSource={require("../../../assets/defaultImage.png")}
                />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView
            edges={['top', 'right', 'left']}
            style={styles.container}
        >
            <TextInput
                style={{
                    height: 60,
                    width: '90%',
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    marginTop: 40,
                    zIndex: 999
                }}
                onChangeText={(text) => {
                    if (text.length === 0) {
                        setResults([]);
                    }
                    myMovies.setSearchQuery(text)
                }}
                value={searchQuery}
                keyboardType="web-search"
                placeholder="Search movies"
                onSubmitEditing={() => {
                    setLoading(true);
                    setResults([]);
                    setPage(1);
                    myMovies.searchMovie(page);
                }}
            />
            {!loading && searchResults?.total_results && (
                <Text style={{ margin: 10 }}>
                    {searchResults.total_results} results
                </Text>
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
                ListEmptyComponent={() => {
                    return !loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No results</Text>
                    </View>) : null;
                }
                }
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    item: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Search;
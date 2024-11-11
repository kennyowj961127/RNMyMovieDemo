import React, { memo, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../../types/navigation";
import { timer } from "../../states/timer";
import { observer } from "mobx-react-lite";
import { movies } from "../../states/movies";
import { Movie } from "../../types/movies";
import TextGradient from "@furkankaya/react-native-linear-text-gradient";
import Icon from "react-native-easy-icon";
import LinearGradient from 'react-native-linear-gradient';
import FastImage from "react-native-fast-image";

const Home = observer((): React.JSX.Element => {
    const navigation = useNavigation<NavigationProps>();
    const myMovies = movies;
    const { popularMovies, movieTypes, movieType } = myMovies;
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [movieList, setMovieList] = React.useState([]);
    const movieTypesFlatListRef = React.useRef<FlatList>(null);

    useEffect(() => {
        //console.log('Home mounted')
        fetchMovies(1);
        return () => {
            console.log('Home unmounted')
        }
    }, [])

    useEffect(() => {
        //console.log('movieType updated', movieType)
        setMovieList([]);
        setPage(1);
        fetchMovies(1);
        movieTypesFlatListRef?.current?.scrollToIndex({
            index: movieTypes.findIndex((item) => item.value == movieType),
            animated: true
        })
        //console.log('scrollToIndex', movieTypes.findIndex((item) => item.value == movieType))
    }, [movieType])

    useEffect(() => {
        //console.log('PopularMovies updated', popularMovies)
        if (popularMovies?.results && popularMovies?.results.length > 0) {
            setMovieList([...movieList, ...popularMovies?.results]);
        }
    }, [popularMovies])

    const fetchMovies = async (page: number) => {
        //console.log('fetch', page)
        if (loading) return;
        setLoading(true);
        try {
            if (movieType == 'popular') {
                await myMovies.fetchPopularMovies(page);
            } else if (movieType == 'now_playing') {
                await myMovies.fetchNowPlayingMovies(page);
            } else if (movieType == 'top_rated') {
                await myMovies.fetchTopRatedMovies(page);
            } else if (movieType == 'upcoming') {
                await myMovies.fetchUpcomingMovies(page);
            }
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const refreshMovies = async () => {
        setMovieList([]);
        setPage(1);
        await fetchMovies(1);
    }

    // const onScrollToIndexFailed = (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
    //     const wait = new Promise(resolve => setTimeout(resolve, 500));
    //     wait.then(() => {
    //         // movieTypesFlatListRef?.current?.scrollToIndex({ index: info.index, animated: true });
    //     });
    // };

    const renderMovieItem = ({ item }: { item: Movie }) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    margin: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    myMovies.fetchMovieDetails(item?.id.toString());
                    navigation.navigate("MovieDetail")
                }}
            >
                <FastImage
                    style={{ width: '100%', height: 250, borderRadius: 10 }}
                    resizeMode="cover"
                    source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`
                    }}
                />
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 5,
                    borderRadius: 5
                }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>{Number(item.vote_average).toFixed(1)}</Text>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 5,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView
            edges={['top', 'right', 'left']}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
            <View style={{
                width: '100%',
                paddingHorizontal: 30,
                paddingVertical: 10,
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FastImage source={require('../../../assets/home/logo.png')}
                    style={{ width: 48, height: 48 }}
                />
                <TextGradient
                    text="My Movies"
                    colors={["#6A64CD", "#E710F7", "#FF2E8C", "#FF5A1D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0, 0.25, 0.5, 0.75]}
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                    }}
                >
                </TextGradient>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                    }}
                    onPress={() => {
                        navigation.navigate('Search');
                    }}
                >
                    <Icon
                        name="search1"
                        size={24}
                        color="black"
                        type="antdesign"
                    />
                </TouchableOpacity>
            </View>

            {/* Show Now Playing, Popular, Top-Rated, Upcoming flatlist row  */}
            <FlatList
                ref={movieTypesFlatListRef}
                // onScrollToIndexFailed={onScrollToIndexFailed}
                style={{ width: '100%', height: 50 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={movieTypes}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            minWidth: 100,
                            marginHorizontal: 10,
                        }}
                        onPress={() => {
                            myMovies.setMovieType(item.value);
                        }}
                    >
                        <LinearGradient
                            style={{
                                borderRadius: 100,
                                width: "100%",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            colors={movieType == item.value ? ["#6A64CD", "#E710F7", "#FF2E8C", "#FF5A1D"] :
                                ["#6B6967", "#6B6967", "#6B6967", "#6B6967"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'white',
                                padding: 10
                            }}>{item.label}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.value}
            />
            <FlatList
                style={{ width: '100%', height: '100%' }}
                data={movieList}
                renderItem={renderMovieItem}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshMovies}
                    />
                }
                keyExtractor={(item, index) => item.id.toString() + index}
                onEndReached={() => fetchMovies(page)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator
                    size="large"
                    color="black"
                /> : null}
            />
        </SafeAreaView>
    );
});

export default Home;


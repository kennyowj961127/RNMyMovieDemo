import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Home: undefined;
    MovieDetail: undefined;
    Profile: undefined;
    News: undefined;
    Account: undefined;
    Search: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type MovieDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetail'>;
type NewsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'News'>;
type AccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

// combine all types into one export
type NavigationProps =
    ProfileScreenNavigationProp |
    HomeScreenNavigationProp |
    NewsScreenNavigationProp |
    AccountScreenNavigationProp |
    SearchScreenNavigationProp |
    MovieDetailScreenNavigationProp;

export type {
    RootStackParamList,
    NavigationProps
};
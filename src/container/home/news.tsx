import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { timer } from "../../states/timer";
import { observer } from "mobx-react-lite";

const News = observer((props: any): React.JSX.Element => {
    const myTimer = timer;
    useEffect(() => {
        //console.log('News mounted')
        return () => {
            //console.log('News unmounted')
        }
    }, [])

    return (
        <SafeAreaView>
            <Text>News</Text>
            <Text>Seconds passed: {myTimer.secondsPassed}</Text>
            <TouchableOpacity
                onPress={() => myTimer.increase()}
            >
                <Text>Increase</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
});

export default News;
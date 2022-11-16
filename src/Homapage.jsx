import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import ProductPage from "./Product";


function HomeScreen({ navigation }) {
    const handleClick = () => {
        navigation.navigate('product')
    }
    const [allData, setAllData] = useState({});
    const [results, setResults] = useState([])
    const [next, setnext] = useState("")

    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon',
            headers: { Accept: '*/*' }
        };

        axios.request(options).then(function (response) {
            setAllData(response.data)
            setResults(response.data.results)
            setnext(response.data.next)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const renderItem = ({ item }) => (
        <ProductPage name={item.name} url={item.url} />
    )

    const fetchMoreData = () => {
        var options = {
            method: 'GET',
            url: next,
            headers: { Accept: '*/*' }
        };

        axios.request(options).then(function (response) {
            setAllData(response.data)
            setResults((res) => [...res, ...response.data.results])
            setnext(response.data.next)
        }).catch(function (error) {
            console.error(error);
        });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button onPress={handleClick} title="Go To" />
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={fetchMoreData}
            />
        </View>
    );
}

export default HomeScreen
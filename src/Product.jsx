import { View, Text } from "react-native";

function ProductPage({ name, url}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{name || ""}</Text>
            <Text>{url || ""}</Text>
        </View>
    );
}

export default ProductPage
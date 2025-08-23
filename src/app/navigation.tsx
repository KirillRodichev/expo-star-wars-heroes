import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation.types";
import { HomeScreen } from "../screens/home";
import { CharacterDetailScreen } from "../screens/character-details-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Star Wars Heroes',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetailScreen}
            options={({ route }) => ({
              title: route.params.character.name,
            })}
          />
        </Stack.Navigator>
    )
}
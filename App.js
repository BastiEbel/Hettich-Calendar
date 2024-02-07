import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./ui/IconButton";
import Home from "./screens/Home";
import ManageScreen from "./screens/ManageScreen";
import WeekScreen from "./screens/WeekScreen";
import CalendarContextProvider, {
  CalendarContext
} from "./store/calendar-context";
import moment from "moment";
import { useContext } from "react";
import { Entries } from "./models/entries";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ManageCalendarOverview() {
  const navigation = useNavigation();
  const getcurrentDate = new Date();
  const formattedDate = moment(getcurrentDate).format("DD-MM-YYYY");
  const entriesCtx = useContext(CalendarContext);
  const entries = new Entries();

  function addEntriesManagement() {
    entries.date = { startDate: formattedDate, lastDate: formattedDate };
    entriesCtx.getCalendarDate(entries.date);
    navigation.navigate("ManageScreen");
  }

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={addEntriesManagement}
          />
        )
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="WeekScreen"
        component={WeekScreen}
        options={{
          title: "Week Overview",
          tabBarLabel: "Week Screen",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <CalendarContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white"
            }}
          >
            <Stack.Screen
              name="ManageCalendarOverview"
              component={ManageCalendarOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageScreen"
              component={ManageScreen}
              options={{
                headerTitle: "Add Entries",
                presentation: "modal"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CalendarContextProvider>
    </>
  );
}

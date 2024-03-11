import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./ui/IconButton";
import Home from "./screens/Home";
import ManageScreen from "./screens/ManageScreen";
import WeekScreen from "./screens/WeekScreen";
import SettingScreen from "./screens/SettingScreen";
import CalendarContextProvider, {
  CalendarContext
} from "./store/calendar-context";
import { init } from "./util/database";
import { Entries } from "./models/entries";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ManageCalendarOverview() {
  const navigation = useNavigation();
  const entriesCtx = useContext(CalendarContext);
  const getcurrentDate = new Date();
  const formattedDate = moment(getcurrentDate).format("DD-MM-YYYY");

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
            icon="menu-outline"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("SettingScreen")}
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
        name="ManageScreen"
        component={ManageScreen}
        options={{
          title: "Add Entries",
          tabBarLabel: "Add Entries",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              onPress={addEntriesManagement}
              name="add-circle-outline"
              size={size}
              color={color}
            />
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
  useEffect(() => {
    init();
  }, []);

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
              name="SettingScreen"
              component={SettingScreen}
              options={{
                headerTitle: "Setting",
                presentation: "modal"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CalendarContextProvider>
    </>
  );
}

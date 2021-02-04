import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PontoDetails from "./pages/PontoDetails";
import PontosMap from "./pages/PontosMap";
import SelectMapPosition from "./pages/CreatePonto/SelectMapPosition";
import PontoData from "./pages/CreatePonto/PontoData";
import Header from "./components/header";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Screen name="PontoMap" component={PontosMap} />
        <Screen
          name="PontoDetails"
          component={PontoDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Ponto Histórico" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="PontoData"
          component={PontoData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

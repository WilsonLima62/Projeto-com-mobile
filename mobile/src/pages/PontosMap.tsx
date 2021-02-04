import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import mapMarker from "../images/map-marker.png";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface PontoItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function PontosMap() {
  const navigation = useNavigation();
  const [pontos, setPontos] = useState<PontoItem[]>([]);

  useFocusEffect(() => {
    api.get("/pontos").then((response) => {
      setPontos(response.data);
    });
  });

  function handleNavigateToPontoDetails(id: number) {
    navigation.navigate("PontoDetails", { id });
  }

  function handleNavigateToCreatePonto() {
    navigation.navigate("SelectMapPosition");
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.9057867,
          longitude: -47.0737174,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {pontos.map((ponto) => {
          return (
            <Marker
              key={ponto.id}
              icon={mapMarker}
              coordinate={{
                latitude: ponto.latitude,
                longitude: ponto.longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToPontoDetails(ponto.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{ponto.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {" "}
          {pontos.length} Pontos Históricos Encontrados
        </Text>

        <RectButton
          style={styles.createPontoButton}
          onPress={handleNavigateToCreatePonto}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    fontFamily: "nunito700",
    color: "#0089a5",
    fontSize: 14,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 28,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },
  footerText: {
    fontFamily: "nunito700",
    color: "#d66915",
  },
  createPontoButton: {
    width: 56,
    height: 56,
    backgroundColor: "#d66915",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

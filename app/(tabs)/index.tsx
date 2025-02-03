import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import EditBalanceModal from "@/components/EditBalanceModal";
import { Link, router } from "expo-router";
// Datos de ejemplo (Movimientos recientes)
const movimientos = [
  { id: "1", title: "Pago en Starbucks", amount: "-$500", icon: "local-cafe" },
  {
    id: "2",
    title: "Recarga de celular",
    amount: "-$1000",
    icon: "smartphone",
  },
  {
    id: "3",
    title: "Ingreso de dinero",
    amount: "+$5000",
    icon: "account-balance-wallet",
  },
];

export default function HomeScreen() {
  const [isViewBalance, setIsViewBalance] = useState<boolean>(false);
  const [isViewAddBalance, setIsViewAddBalance] = useState<boolean>(false);
  const [isViewTakeBalance, setIsViewTakeBalance] = useState<boolean>(false);

  const changeVisibility = () => setIsViewBalance(!isViewBalance);
  const changeAddBalance = () => setIsViewAddBalance(!isViewAddBalance);
  const changeTakeBalance = () => setIsViewTakeBalance(!isViewTakeBalance);

  return (
    <SafeAreaView style={styles.container}>
      {/* Modals */}
      <EditBalanceModal
        visibility={isViewAddBalance}
        close={changeAddBalance}
        mode="add"
      />
      <EditBalanceModal
        visibility={isViewTakeBalance}
        close={changeTakeBalance}
        mode="take"
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userHeader}>
          <AntDesign name="user" size={24} color="white" />
          <Text style={styles.userName}>Hola, Alvaro Ballarini</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* Balance de la cuenta */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceHeaderContainer}>
          <Text style={styles.balanceHeaderText}>Disponible</Text>
          <View style={styles.balanceButtonContainer}>
            <Text style={styles.balanceButton}>
              <Link href={"/History"}>Ir a mis movimientos</Link>
            </Text>
            <AntDesign name="caretright" size={14} color="#00ff99" />
          </View>
        </View>
        <View style={styles.balanceBodyContainer}>
          <Text style={styles.balanceText}>
            {isViewBalance ? "$40.354" : "******"}
          </Text>
          <TouchableOpacity onPress={changeVisibility}>
            {isViewBalance ? (
              <Feather name="eye" size={24} color="white" />
            ) : (
              <Feather name="eye-off" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.balanceActions}>
          <Accion
            icon={"arrow-upward"}
            text={"Agregar"}
            onPress={changeAddBalance}
          />
          <Accion
            icon={"arrow-downward"}
            text={"Retirar"}
            onPress={changeTakeBalance}
          />
        </View>
      </View>

      {/* Acciones rápidas */}
      <View style={styles.accionesContainer}>
        <Accion icon="savings" text="Ahorros"  onPress={() => router.push("/Saving")}/>
        <Accion icon="autorenew" text="Automatizar" />
        <Accion icon="align-vertical-bottom" text="Ver Gastos" />
        <Accion icon="qr-code-scanner" text="Escanear Fotos" />
      </View>

      {/* Lista de Movimientos */}
      <Text style={styles.tituloMovimientos}>Últimos movimientos</Text>
      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Movimiento item={item} />}
      />
    </SafeAreaView>
  );
}

// Componente de botón de acción rápida
const Accion = ({
  icon,
  text,
  onPress,
}: {
  icon: string;
  text: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.accion} onPress={onPress}>
    <MaterialIcons name={icon} size={30} color="white" />
    <Text style={styles.accionTexto}>{text}</Text>
  </TouchableOpacity>
);

// Componente de un movimiento en la lista
const Movimiento = ({ item }) => (
  <View style={styles.movimiento}>
    <MaterialIcons name={item.icon} size={24} color="#4F4F4F" />
    <View style={styles.movimientoInfo}>
      <Text style={styles.movimientoTexto}>{item.title}</Text>
      <Text style={styles.movimientoMonto}>{item.amount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  balanceActions: { display: "flex", flexDirection: "row", width: "100%" },
  balanceBodyContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  balanceButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  balanceHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  balanceContainer: {
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 10,
  },
  balanceHeaderText: { fontSize: 12, fontWeight: "bold", color: "white" },
  balanceText: { fontSize: 25, fontWeight: "bold", color: "white" },
  balanceButton: { fontSize: 10, fontWeight: "bold", color: "#00ff99" },
  userHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  userName: { fontSize: 16, fontWeight: "bold", color: "white" },
  accionesContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    columnGap: 30,
  },
  accion: {
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 10,
  },
  accionTexto: { color: "white", marginTop: 5, fontSize: 14 },
  tituloMovimientos: { color: "white", fontSize: 18, marginBottom: 10 },
  movimiento: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  movimientoInfo: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  movimientoTexto: { color: "white", fontSize: 16 },
  movimientoMonto: { color: "#00ff99", fontSize: 16, fontWeight: "bold" },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import EditBalanceModal from "@/components/EditBalanceModal";
import { Link, router } from "expo-router";
import typeIconsName from "@/types/typeIconsName";
import typeTransactionHistory from "@/types/typeTransaction";
import useGetUser from "@/hooks/useGetUser";
import CardCustom from "@/components/CardCustom";
export default function HomeScreen() {
  const { User, err, loading } = useGetUser();
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
          <AntDesign name="user" size={24} color="#FFFFFF" />
          <Text style={styles.userName}>Hola, {User?.name}</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
      </View>

      {/* Balance de la cuenta */}
      <CardCustom>
        <View style={styles.balanceHeaderContainer}>
          <Text style={styles.balanceHeaderText}>Disponible</Text>
          <View style={styles.balanceButtonContainer}>
            <Link style={styles.balanceButtonText} href={"/History"}>
              Ir a mis movimientos
            </Link>
            <AntDesign name="caretright" size={14} color="#00ff99" />
          </View>
        </View>
        <View style={styles.balanceBodyContainer}>
          <Text style={styles.balanceText}>
            {isViewBalance ? `$${User?.balance}` : "******"}
          </Text>
          <TouchableOpacity onPress={changeVisibility}>
            {isViewBalance ? (
              <Feather name="eye" size={24} color="#FFFFFF" />
            ) : (
              <Feather name="eye-off" size={24} color="#FFFFFF" />
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
      </CardCustom>

      {/* Acciones rápidas */}
      <View style={styles.accionesContainer}>
        <Accion
          icon="savings"
          text="Ahorros"
          onPress={() => router.push("/Saving")}
        />
        <Accion icon="autorenew" text="Automatizar" />
        <Accion icon="align-vertical-bottom" text="Ver Gastos" />
        <Accion icon="qr-code-scanner" text="Escanear Fotos" />
      </View>

      {/* Lista de Movimientos */}
      <Text style={styles.tituloMovimientos}>Últimos movimientos</Text>
      <FlatList
        data={User?.transactions}
        keyExtractor={(item) => String(item.id)}
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
  icon: typeIconsName;
  text: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.accion} onPress={onPress}>
    <MaterialIcons name={icon} size={22} color="#A0A0A0" />
    <Text style={styles.accionTexto}>{text}</Text>
  </TouchableOpacity>
);

// Componente de un movimiento en la lista
const Movimiento = ({ item }: { item: typeTransactionHistory }) => (
  <View style={styles.movimiento}>
    <MaterialIcons name={item.icon} size={24} color="#A0A0A0" />
    <View style={styles.movimientoInfo}>
      <Text style={styles.movimientoTexto}>{item.title}</Text>
      <Text style={styles.movimientoMonto}>{item.amount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  balanceActions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 15,
    gap: 12,
  },
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
    padding: 20,
    borderRadius: 10,
  },
  balanceHeaderText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#A0A0A0",
  },
  balanceText: {
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "900",
    color: "#00FF99",
  },
  balanceButton: { fontSize: 10, fontWeight: "bold", color: "#00ff99" },
  balanceButtonText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "700",
    color: "#00ff99",
  },
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
    paddingVertical: 16,
  },
  userName: { fontSize: 18, fontWeight: "600", color: "#FFFFFF" },
  accionesContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    columnGap: 30,
  },
  accion: {
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 55, 0.46)",
    padding: 10,
    borderRadius: 10,
  },
  accionTexto: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  tituloMovimientos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  movimiento: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  movimientoInfo: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  movimientoTexto: { color: "#FFFFFF", fontSize: 16 },
  movimientoMonto: { color: "#00ff99", fontSize: 16, fontWeight: "bold" },
});

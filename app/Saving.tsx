import CardCustom from "@/components/CardCustom";
import CircleAnimationComponent from "@/components/CircleAnimationComponent";
import typeIconsName from "@/types/typeIconsName";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const CategoriesExamples: CategoryItemProps[] = [
  { id: 1, icon: "arrow-forward-ios", balance: 2000, name: "Traje Spiderman" },
  { id: 2, icon: "arrow-forward-ios", balance: 2000, name: "Traje Spiderman" },
  { id: 3, icon: "arrow-forward-ios", balance: 2000, name: "Traje Spiderman" },
];
function Savings() {
  return (
    <SafeAreaView style={styles.container}>
      <CircleAnimationComponent size={"large"} />
      <CardCustom style={{ width: "90%", paddingVertical: 30 }}>
        <Text style={styles.balanceHeaderText}>Total</Text>
        <Text style={styles.balanceText}>$40.115</Text>
      </CardCustom>
      <View style={styles.headerCategories}>
        <Text style={styles.headerCategoriesText}>Tus reservas</Text>
        <View style={styles.buttonsContainer}>
          <ButtonCategories tittle="Reservar" focus />
          <ButtonCategories tittle="Retirar" />
        </View>
      </View>
      <FlatList
        data={CategoriesExamples}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CategoryItem {...item} />}
        style={styles.CategoriesContainer}
      />
    </SafeAreaView>
  );
}

const ButtonCategories = ({
  tittle,
  onPress,
  focus = false,
}: {
  tittle: string;
  onPress?: () => void;
  focus?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={focus ? styles.buttonCategoryFocus : styles.buttonCategory}
  >
    <MaterialIcons
      name={focus ? "arrow-upward" : "arrow-downward"}
      size={15}
      color={focus ? "#00ff99" : "white"}
    />
    <Text
      style={focus ? styles.buttonCategoryTextFocus : styles.buttonCategoryText}
    >
      {tittle}
    </Text>
  </TouchableOpacity>
);

type CategoryItemProps = {
  id: number;
  name: string;
  icon: typeIconsName;
  balance: number;
};
const CategoryItem = ({ name, icon, balance }: CategoryItemProps) => (
  <TouchableOpacity style={styles.CategoryItemContainer}>
    <View style={styles.CategoryItemIcon}>
      <MaterialIcons name={icon} size={15} color="white" />
    </View>
    <View style={styles.CategoryItemBodyContainer}>
      <View style={styles.CategoryItemBodyHeader}>
        <Text style={styles.CategoryItemBodyHeaderText}>{name}</Text>
        <MaterialIcons name={"arrow-forward-ios"} size={10} color="white" />
      </View>
      <Text style={styles.CategoryItemBodyBalanceText}>${balance}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    overflow: "hidden",
  },
  balanceHeaderText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "600",
  },
  balanceText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00ff99",
  },
  headerCategories: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerCategoriesText: {
    fontSize: 12,
    color: "grey",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  buttonCategory: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 7,
    backgroundColor: "#1e1e1e",
    padding: 7,
    paddingHorizontal: 8,
  },
  buttonCategoryFocus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 7,
    padding: 7,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0, 255, 153, 0.2)",
  },
  buttonCategoryText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "700",
  },
  buttonCategoryTextFocus: {
    color: "#00ff99",
    fontSize: 12,
    fontWeight: "700",
  },
  CategoriesContainer: {
    display: "flex",
    width: "90%",
    paddingVertical: 20,
  },
  CategoryItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 7,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  CategoryItemIcon: {
    display: "flex",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 100,
  },
  CategoryItemBodyContainer: {
    width: "70%",
    gap: 5,
  },
  CategoryItemBodyHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CategoryItemBodyHeaderText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "700",
  },
  CategoryItemBodyBalanceText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Savings;

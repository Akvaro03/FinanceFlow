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
  { icon: "arrow-downward", balance: 2000, name: "Traje Spiderman" },
  { icon: "arrow-downward", balance: 2000, name: "Traje Spiderman" },
  { icon: "arrow-downward", balance: 2000, name: "Traje Spiderman" },
];
function Savings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceHeaderText}>Total</Text>
        <Text style={styles.balanceText}>$40.115</Text>
      </View>
      <View style={styles.headerCategories}>
        <Text style={styles.headerCategoriesText}>Tus reservas</Text>
        <View style={styles.buttonsContainer}>
          <ButtonCategories tittle="Reservar" focus />
          <ButtonCategories tittle="Retirar" />
        </View>
      </View>
      <FlatList
        data={CategoriesExamples}
        keyExtractor={(item) => item.name}
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
      name={"arrow-downward"}
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
  name: string;
  icon: string;
  balance: number;
};
const CategoryItem = ({ name, icon, balance }: CategoryItemProps) => (
  <View style={styles.CategoryItemContainer}>
    <View style={styles.CategoryItemIcon}>
      <MaterialIcons name={icon} size={15} color="white" />
    </View>
    <View>
      <View>
        <Text>{name}</Text>
        <MaterialIcons name={"arrow-forward-ios"} size={15} color="white" />
      </View>
      <Text>{balance}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  balanceContainer: {
    width: "90%",
    marginVertical: 20,
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 10,
  },
  balanceHeaderText: {
    fontSize: 16,
    color: "grey",
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "#121212",
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
  },
  buttonCategoryTextFocus: {
    color: "#00ff99",
    fontSize: 12,
  },
  CategoriesContainer: {
    display: "flex",
    width: "90%",
    paddingVertical:20
  },
  CategoryItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical:5,
    borderRadius:8,
    backgroundColor: "#121212",
  },
  CategoryItemIcon:{
    display:"flex",
    justifyContent:"center",
    width:50,
    height:50,
    alignItems:"center",
    backgroundColor: "#1e1e1e",
    borderRadius:100
  }
});

export default Savings;

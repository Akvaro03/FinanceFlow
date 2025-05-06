import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
function EditBalanceModal({
  visibility,
  close,
  mode,
}: {
  visibility: boolean;
  close: () => void;
  mode: "income" | "expense";
}) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { addTransaction } = useAuth();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    paymentMethod: "",
    description: "",
  });
  
  const handleAddTransaction = async () => {
    await addTransaction({
      amount: parseFloat(formData.amount),
      type: mode,
      category: "Comida",
      paymentMethod: "Tarjeta",
      date: new Date(),
      description: "Cena en restaurante",
    });
  };
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  return (
    <Modal visible={visibility} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {mode === "income" ? "Agregar Dinero" : "Agregar Gasto"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="$"
            inputMode="numeric"
            onChangeText={(value) => handleChange("amount", value)}
            placeholderTextColor="#999"
          />
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={close}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddTransaction}
              style={styles.submitButton}
            >
              <Text style={styles.buttonSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  picker: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: "#00ff99",
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  buttonSaveText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditBalanceModal;

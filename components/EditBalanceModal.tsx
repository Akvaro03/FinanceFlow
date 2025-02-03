import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function EditBalanceModal({
  visibility,
  close,
  mode,
}: {
  visibility: boolean;
  close: () => void;
  mode: "add" | "take";
}) {
  return (
    <Modal visible={visibility} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {mode === "add" ? "Agregar Balance" : "Retirar Balance"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="$"
            inputMode="numeric"
            placeholderTextColor="#999"
          />

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={close}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.buttonSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  botonAgregar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginVertical: 20,
  },
  botonTexto: { color: "white", fontSize: 16, marginLeft: 10 },

  // Estilos del Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: "#00ff99",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: { textAlign: "center", color: "white", fontWeight: "bold" },
  buttonSaveText: { textAlign: "center", color: "black", fontWeight: "bold" },
});

export default EditBalanceModal;

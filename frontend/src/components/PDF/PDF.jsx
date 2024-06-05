import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import headerPDF from "../PDF/headerPDF.png";
import footerPDF from "../PDF/footerPDF.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffff",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  section: {
    width: "80%",
    padding: 0,
  },
  text: {
    fontSize: 10,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    width: "80%",
  },
  // Table
  table: {
    width: "100%",
    marginTop: 50,
  },
  row: {
    flexDirection: "row", // Arrange elements horizontally
    alignItems: "center", // Align vertically
    justifyContent: "space-between", // Distribute evenly
    padding: 5, // Add some padding
    borderWidth: 1, // Add a border below each row
    borderColor: "#0000",
    width: "100%",
    margin: "auto",
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },

  col1: {
    // Allocate available space proportionally (can adjust for different widths)
    marginRight: 20,
    fontSize: 10,
  },
  col2: {
    flex: 2,
    fontSize: 10,
  },
  col3: {
    flex: 1,
    fontSize: 10,
  },
});

function PDF({ tutor, tutorados, grupo, carrera, periodo }) {
  console.log();
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.image}>
          <Image src={headerPDF} />
        </View>
        <View style={styles.section}>
          <Text style={[styles.text]}>
            RELACIÓN DE TUTORADOS DE {carrera.nombre_carrera}, QUE TOMARÁN
            TUTORÍAS EN EL SEMESTRE ESCOLAR {periodo[0].identificacion_corta}.
          </Text>

          <View style={styles.table}>
            <View style={[styles.row]}>
              <Text style={[styles.col1]}>
                NOMBRE DEL TUTOR: {tutor[0].nombre_empleado}{" "}
                {tutor[0].apellidos_empleado}
              </Text>
            </View>

            <View style={[styles.row, styles.header, styles.bold]}>
              <Text style={[styles.col1]}>#</Text>
              <Text style={[styles.col2]}>NOMBRE DEL TUTORADO:</Text>
              <Text style={[styles.col3]}>NO. DE CONTROL:</Text>
            </View>

            {tutorados.map((row, i) => (
              <View key={i} style={styles.row} wrap={false}>
                <Text style={styles.col1}>{i + 1}</Text>
                <Text style={styles.col2}>
                  <Text style={styles.bold}>
                    {row.apellido_paterno} {row.apellido_materno}{" "}
                    {row.nombre_alumno}
                  </Text>
                </Text>
                <Text style={styles.col3}>{row.no_de_control}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* <Text>{tutor[0].rfc}</Text> */}
        <View style={styles.image}>
          <Image src={footerPDF} />
        </View>
      </Page>
    </Document>
  );
}

export default PDF;

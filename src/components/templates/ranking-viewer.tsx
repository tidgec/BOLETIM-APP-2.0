import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'column',
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'solid',
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
  },
  lastTableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
  },
})

interface Row {
  classification: number
  qav: number
  qc: number
  civilId: string
  name: string
  average: number | string
  concept: string
  birthday: string
  pole: string
  status: string
}

interface RankingViewerProps {
  courseName: string
  ranking: Row[]
}

export const RankingViewer = ({ courseName, ranking }: RankingViewerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Classificação Geral: {courseName}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>CLASS</Text>
            <Text style={styles.tableCell}>Q.AV</Text>
            <Text style={styles.tableCell}>Q.C</Text>
            <Text style={styles.tableCell}>RG</Text>
            <Text style={styles.tableCell}>NOME COMPLETO</Text>
            <Text style={styles.tableCell}>MÉDIA FINAL</Text>
            <Text style={styles.tableCell}>CONCEITO</Text>
            <Text style={styles.tableCell}>DATA DE NASCIMENTO</Text>
            <Text style={styles.tableCell}>POLO</Text>
            <Text style={styles.lastTableCell}>STATUS</Text>
          </View>
          {ranking.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{row.classification}</Text>
              <Text style={styles.tableCell}>{row.qav}</Text>
              <Text style={styles.tableCell}>{row.qc}</Text>
              <Text style={styles.tableCell}>{row.civilId}</Text>
              <Text style={styles.tableCell}>{row.name}</Text>
              <Text style={styles.tableCell}>{row.average}</Text>
              <Text style={styles.tableCell}>{row.concept}</Text>
              <Text style={styles.tableCell}>{row.birthday}</Text>
              <Text style={styles.tableCell}>{row.pole}</Text>
              <Text style={styles.lastTableCell}>{row.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

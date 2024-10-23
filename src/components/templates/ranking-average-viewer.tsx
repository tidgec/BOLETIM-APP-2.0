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
  average: number | string | null
  pole: string
}

interface RankingViewerProps {
  courseName: string
  ranking: Row[]
}

export const RankingAverageViewer = ({
  courseName,
  ranking,
}: RankingViewerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Classificação Geral: {courseName}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>CLASS</Text>
            <Text style={styles.tableCell}>MÉDIA</Text>
            <Text style={styles.tableCell}>POLO</Text>
          </View>
          {ranking.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{row.classification}</Text>
              <Text style={styles.tableCell}>{row.pole}</Text>
              <Text style={styles.tableCell}>{row.average}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

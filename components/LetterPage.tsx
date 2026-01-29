import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.5 },
  header: { alignItems: "center", marginBottom: 20 },
  schoolName: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  horizontalRule: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  content: { marginTop: 20 },
  subject: {
    textAlign: "center",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
    marginVertical: 20,
  },
  paymentInfo: {
    marginTop: 30,
    fontFamily: "Helvetica-Bold",
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  stamp: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    width: 180,
    textAlign: "center",
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 5,
    fontStyle: "italic",
  },
  underline: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    textAlign: "center",
  },
  inlineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
});

interface Learner {
  name: string;
  owing: number;
  date?: string;
  classstream?: string;
  reminder?: number;
}

interface LetterPageProps {
  learner: Learner;
}

interface BalanceTableProps {
  learners: Learner[];
}

const LetterPage = ({ learner }: LetterPageProps) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.schoolName}>MATER DOLOROSA HIGH SCHOOL</Text>
      <View style={styles.contactRow}>
        <View>
          <Text>P. O. BOX 62</Text>
          <Text>MBABANE H100</Text>
        </View>
        <Image style={{ width: 60, height: 60 }} src="/letterhead.png" />
        <View>
          <Text>CELL: 76332667</Text>
        </View>
      </View>
    </View>

    <View style={styles.horizontalRule} />

    <View style={styles.content}>
      <Text>{learner.date || "29th January 2026"}</Text>
      <Text style={{ marginTop: 10 }}>Praise be Jesus Christ!</Text>
      <Text style={{ marginTop: 20 }}>Dear Parents/Guardians</Text>

      <Text style={styles.subject}>RE: OUTSTANDING FEES</Text>

      <View style={styles.inlineContainer}>
        <Text>You, the parent to </Text>
        <Text style={[styles.underline, { width: 150 }]}>{learner.name}</Text>
        <Text> in Form </Text>
        <Text style={[styles.underline, { width: 40 }]}>
          {learner.classstream || "___"}
        </Text>
        <Text> are kindly requested to settle the amount of E </Text>
        <Text style={[styles.underline, { width: 60 }]}>
          {learner.owing.toFixed(2)}
        </Text>
        <Text> being outstanding school fees.</Text>
      </View>

      <View style={styles.paymentInfo}>
        <Text>SCHOOL CELLPHONE MOBILE MONEY: 76332667</Text>
        <Text>BANK NAME: NEDBANK MBABANE</Text>
        <Text>SCHOOL ACCOUNT NUMBER: 20000025365</Text>
      </View>

      <Text style={{ marginTop: 20 }}>
        This is reminder number {learner.reminder || "1st"} in 2026.
      </Text>
      <Text style={{ marginTop: 20 }}>
        Thank you in advance for your cooperation.
      </Text>
      <Text style={{ marginTop: 10 }}>Yours faithfully</Text>
    </View>

    <View style={styles.signatureSection}>
      <View>
        <Text style={{ marginTop: 20, fontStyle: "italic" }}>[Signed]</Text>
        <Text style={{ fontFamily: "Helvetica-Bold", marginTop: 5 }}>
          F. J. NDLOVU
        </Text>
        <Text>Principal</Text>
      </View>
      <View style={styles.stamp}>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>
          MATER DOLOROSA HIGH SCHOOL
        </Text>
        <Text>P.O.Box 62, Mbabane H100</Text>
        <Text>Tel: (+268) 2404 3082</Text>
        <Text style={{ marginTop: 10, fontFamily: "Helvetica-Bold" }}>
          PRINCIPAL
        </Text>
      </View>
    </View>

    <View style={styles.footer}>
      <Text>dolorosa2022@gmail.com</Text>
    </View>
  </Page>
);

const BulkSchoolLetters = ({ learners }: BalanceTableProps) => (
  <Document>
    {learners?.map((student, index) => (
      <LetterPage key={index} learner={student} />
    ))}
  </Document>
);

export default BulkSchoolLetters;

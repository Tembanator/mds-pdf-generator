import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { SettingsData } from "@/Lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: { alignItems: "center", marginBottom: 20 },
  schoolName: { fontSize: 18, fontFamily: "Times-Bold", marginBottom: 5 },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  content: { marginTop: 20 },
  subject: {
    textAlign: "center",
    textDecoration: "underline",
    fontFamily: "Times-Bold",
    marginVertical: 20,
  },
  paymentInfo: {
    marginTop: 30,
    fontFamily: "Times-Bold",
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
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    textAlign: "center",
    fontFamily: "Times-Bold",
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
}

interface LetterPageProps {
  learner: Learner;
  settings: SettingsData;
}

interface BalanceTableProps {
  learners: Learner[];
  settings: SettingsData;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function getOrdinalSuffix(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return "";
  const mod100 = num % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return "th";
  }

  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

const LetterPage = ({ learner, settings }: LetterPageProps) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Image style={{ width: 400, height: 100 }} src="/letterhead.png" />
    </View>

    <View style={styles.horizontalRule} />

    <View style={styles.content}>
      <Text style={{ fontFamily: "Times-Bold" }}>
        {formatDate(settings.selectedDate)}
      </Text>
      <Text style={{ marginTop: 10 }}>Praise be Jesus Christ!</Text>
      <Text style={{ marginTop: 20 }}>Dear Parents/Guardians</Text>

      <Text style={styles.subject}>RE: OUTSTANDING FEES</Text>

      <View style={styles.inlineContainer}>
        <Text>You, the parent to </Text>
        <Text style={[styles.paymentInfo]}>{learner.name}</Text>
        <Text> in Form </Text>
        <Text style={[styles.paymentInfo]}>{settings.classroom}</Text>
        <Text> are kindly requested to settle the amount of E </Text>
        <Text style={[styles.paymentInfo]}>{learner.owing.toFixed(2)}</Text>
        <Text> being outstanding school fees.</Text>
      </View>

      <View style={styles.paymentInfo}>
        <Text>SCHOOL CELLPHONE MOBILE MONEY: 76332667</Text>
        <Text>BANK NAME: NEDBANK MBABANE</Text>
        <Text>SCHOOL ACCOUNT NUMBER: 20000025365</Text>
      </View>

      <Text style={{ marginTop: 20, fontFamily: "Times-Bold" }}>
        This is the {settings.reminders}
        {getOrdinalSuffix(settings.reminders)} reminder in{" "}
        {formatDate(settings.selectedDate).slice(-4)}.
      </Text>
      <Text style={{ marginTop: 20 }}>
        Thank you in advance for your cooperation.
      </Text>
      <Text style={{ marginTop: 10 }}>Yours faithfully</Text>
    </View>

    <View style={styles.signatureSection}>
      <View>
        <Image style={{ width: 70, height: 20 }} src="/letterhead.png" />
        <Text style={{ fontFamily: "Times-Bold", marginTop: 5 }}>
          S. V. NXUMALO
        </Text>
        <Text>Principal</Text>
      </View>
      <View style={styles.stamp}>
        <Text style={{ fontFamily: "Times-Bold" }}>
          MATER DOLOROSA HIGH SCHOOL
        </Text>
        <Text>P.O.Box 62, Mbabane H100</Text>
        <Text>Tel: (+268) 2404 3082</Text>
        <Text style={{ marginTop: 10, fontFamily: "Times-Bold" }}>
          PRINCIPAL
        </Text>
      </View>
    </View>

    <View style={styles.footer}>
      <Text>dolorosa2022@gmail.com</Text>
    </View>
  </Page>
);

const BulkSchoolLetters = ({ learners, settings }: BalanceTableProps) => (
  <Document>
    {learners?.map((student, index) => (
      <LetterPage key={index} learner={student} settings={settings} />
    ))}
  </Document>
);

export default BulkSchoolLetters;

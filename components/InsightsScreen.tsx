import { getAllUserJournals, getUserJournalCount } from "@/app/lib/api";
import { supabase } from "@/app/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function InsightsScreen() {
  const [journals, setJournals] = useState<any[]>([]);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [streak, setStreak] = useState<number>(2);
  const [selectedJournal, setSelectedJournal] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchJournalsAndStats() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const journalsResult = await getAllUserJournals(user.id);
        if (journalsResult.data) {
          setJournals(journalsResult.data);

          const dateStrings = journalsResult.data.map((j) =>
            new Date(j.created_at).toDateString()
          );
          const dateSet = new Set(dateStrings);

          let currentStreak = 0;
          let streakDate = new Date();

          while (true) {
            const dateStr = streakDate.toDateString();
            if (dateSet.has(dateStr)) {
              currentStreak++;
              streakDate.setDate(streakDate.getDate() - 1);
            } else {
              break;
            }
          }

          setStreak(currentStreak);
        }

        const countResult = await getUserJournalCount(user.id);
        if (typeof countResult.count === "number") {
          setTotalEntries(countResult.count);
        }
      }
    }
    fetchJournalsAndStats();
  }, []);

  useEffect(() => {
    async function fetchJournals() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const result = await getAllUserJournals(user.id);
        if (result.data) setJournals(result.data);
      }
    }
    fetchJournals();
  }, []);

  // Header content for FlatList
  const renderHeader = () => (
    <View>
      <Text style={styles.header}>Insights</Text>
      {/* Your Streaks */}
      <Text style={styles.sectionTitle}>Your Streaks</Text>
      <View style={styles.streakCard}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Ionicons name="flame-outline" size={28} color="#fff" />
          {streak > 0 && (
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 22,
                marginLeft: 8,
              }}
            >
              {streak}
            </Text>
          )}
        </View>
        <Text style={styles.streakTitle}>
          {streak > 0
            ? `${streak} Day${streak > 1 ? "s" : ""} Streak`
            : "No Current Streak"}
        </Text>
        <Text style={styles.streakSubtitle}>
          {streak > 0
            ? "Keep journaling daily to maintain your streak!"
            : "Journal at least once a day to build a streak"}
        </Text>
        <TouchableOpacity style={styles.streakButton}>
          <Text style={styles.streakButtonText}>Set Schedule</Text>
        </TouchableOpacity>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color="#fff"
          style={styles.streakMenu}
        />
      </View>
      {/* Stats */}
      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.statsCard}>
        <Text style={styles.statsValue}>{totalEntries}</Text>
        <Text style={styles.statsLabel}>Entries</Text>
        <View style={styles.monthsRow}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m) => (
            <Text key={m} style={styles.monthText}>
              {m}
            </Text>
          ))}
        </View>
      </View>
      {/* Calendar */}
      <Text style={styles.sectionTitle}>Calendar</Text>

      <Calendar
        theme={{
          backgroundColor: "#F9FAFB",
          calendarBackground: "#F9FAFB",
          textSectionTitleColor: "#5F3DC4",
          selectedDayBackgroundColor: "#8B5CF6",
          selectedDayTextColor: "#fff",
          todayTextColor: "#5F3DC4",
          dayTextColor: "#111827",
          textDisabledColor: "#d9e1e8",
          arrowColor: "#5F3DC4",
          monthTextColor: "#5F3DC4",
          indicatorColor: "#5F3DC4",
        }}
        style={{
          borderRadius: 12,
          elevation: 1,
        }}
      />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Your Journals
      </Text>
      {journals.length === 0 && (
        <Text style={{ color: "#888", marginBottom: 16 }}>
          No journals yet.
        </Text>
      )}
    </View>
  );

  return (
    <>
      <FlatList
        data={journals}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.journalItem}
            onPress={() => {
              setSelectedJournal(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.journalTopic}>{item.topic}</Text>
            <Text style={styles.journalDate}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 16 }}
      />

      {/* Journal Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Journal Details</Text>
            {selectedJournal && (
              <>
                <Text style={styles.modalLabel}>Topic:</Text>
                <Text style={styles.modalValue}>{selectedJournal.topic}</Text>
                <Text style={styles.modalLabel}>Note:</Text>
                <Text style={styles.modalValue}>{selectedJournal.note}</Text>
                <Text style={styles.modalLabel}>Date & Time:</Text>
                <Text style={styles.modalValue}>
                  {new Date(selectedJournal.created_at).toLocaleString()}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 80,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#5F3DC4",
  },
  streakCard: {
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  streakTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  streakSubtitle: {
    color: "#EDE9FE",
    textAlign: "center",
    marginVertical: 8,
  },
  streakButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    opacity: 0.4,
  },
  streakButtonText: {
    color: "#5F3DC4",
    fontWeight: "600",
    opacity: 0.8,
  },
  streakMenu: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  statsCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  statsValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  statsLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  monthsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monthText: {
    fontSize: 12,
    color: "#9CA3AF",
    width: "8.3%",
    textAlign: "center",
    marginVertical: 2,
  },
  calendarBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
  },
  calendarMonth: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111827",
  },
  calendarNav: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 8,
  },
  calendarGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayLabel: {
    width: "13%",
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },
  dayNumber: {
    width: "13%",
    textAlign: "center",
    fontSize: 14,
    color: "#111827",
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectedDay: {
    backgroundColor: "#5F3DC4",
    color: "#fff",
    fontWeight: "600",
  },

  journalItem: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journalTopic: {
    fontWeight: "600",
    color: "#5F3DC4",
    fontSize: 15,
  },
  journalDate: {
    color: "#6B7280",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
    color: "#5F3DC4",
  },
  modalLabel: {
    fontWeight: "600",
    marginTop: 8,
    color: "#6B7280",
  },
  modalValue: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 4,
  },
  closeButton: {
    backgroundColor: "#5F3DC4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
  },
});

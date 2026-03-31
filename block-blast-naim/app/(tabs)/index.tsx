import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useAIChat } from '../../hooks/useAIChat';
import ChatBar from '../../components/ChatBar';
import JsonRenderer from '../../components/JsonRenderer';

// Constants
const COLORS = {
  red: '#ff4757',
  blue: '#5352ed',
  green: '#2ed573',
};

const BOARD_SIZE = 8;

// Sample Hardcoded Data
const sampleGrid = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
sampleGrid[3][3] = COLORS.red;
sampleGrid[3][4] = COLORS.red;
sampleGrid[4][3] = COLORS.red;
sampleGrid[4][4] = COLORS.red;
sampleGrid[1][6] = COLORS.blue;
sampleGrid[2][6] = COLORS.blue;
sampleGrid[6][1] = COLORS.green;

const upcomingPieces = [
  { color: COLORS.red, shape: [[1, 0], [1, 0], [1, 1]] },
  { color: COLORS.blue, shape: [[1], [1]] },
  { color: COLORS.green, shape: [[1]] }
];

export default function GameScreen() {
  const { uiConfig, sendMessage, isLoading } = useAIChat();

  const isLight = uiConfig.theme === 'light';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: uiConfig.backgroundColor }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={28} color={isLight ? '#1a202c' : '#fff'} />
          </TouchableOpacity>
          <Text style={[styles.titleText, { color: isLight ? '#1a202c' : '#fff' }]}>BLOCK BLAST</Text>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="crown" size={22} color="#ffcc00" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <JsonRenderer 
            uiConfig={uiConfig} 
            sampleGrid={sampleGrid} 
            upcomingPieces={upcomingPieces} 
          />
        </ScrollView>

        {/* Chat Input */}
        <ChatBar onSend={sendMessage} isLoading={isLoading} />

        {/* Bottom Navigation */}
        <View style={[styles.bottomNav, { 
          backgroundColor: uiConfig.backgroundColor,
          borderTopColor: isLight ? '#cbd5e0' : '#1a2035'
        }]}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="grid" size={28} color={isLight ? '#1a202c' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="trophy-outline" size={28} color={isLight ? '#718096' : '#a0aec0'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings-outline" size={28} color={isLight ? '#718096' : '#a0aec0'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: {
    padding: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});

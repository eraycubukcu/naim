import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatBar({ onSend, isLoading }: ChatBarProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a UI command (e.g., 'light theme' or 'hide score')..."
        placeholderTextColor="#a0aec0"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[styles.sendButton, isLoading && styles.disabledButton]} 
        onPress={handleSend}
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="send" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#131b2f',
    borderTopWidth: 1,
    borderTopColor: '#1a2035',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a2035',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#5352ed',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#3a3a3a',
  }
});

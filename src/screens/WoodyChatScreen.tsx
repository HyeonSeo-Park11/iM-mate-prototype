import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { woodyProfile, woodyTopPolicy } from '../data/mockWoody';

type Props = NativeStackScreenProps<RootStackParamList, 'WoodyChat'>;

type Msg =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'card' };

const SCRIPT: Msg[] = [
  { id: '1', kind: 'text', text: '늦은 밤이지만 잠깐 알려드릴 게 있어요 🌙' },
  {
    id: '2',
    kind: 'text',
    text: `만 ${woodyProfile.age}세, ${woodyProfile.region} 거주 정보 기준으로 딱 맞는 청년 정책을 찾았어요.`,
  },
  { id: '3', kind: 'card' },
];

export default function WoodyChatScreen({ navigation }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visibleCount >= SCRIPT.length) return;
    setTyping(true);
    const typingDelay = SCRIPT[visibleCount].kind === 'card' ? 900 : 1100;
    const t = setTimeout(() => {
      setTyping(false);
      setVisibleCount((c) => c + 1);
    }, typingDelay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.avatar}>
            <Ionicons name="document-text" size={16} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>우디 정책봇</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {SCRIPT.slice(0, visibleCount).map((m) =>
          m.kind === 'text' ? (
            <View key={m.id} style={styles.bubbleRow}>
              <View style={styles.botAvatar}>
                <Ionicons name="document-text" size={14} color="#fff" />
              </View>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{m.text}</Text>
              </View>
            </View>
          ) : (
            <View key={m.id} style={styles.bubbleRow}>
              <View style={styles.botAvatar}>
                <Ionicons name="document-text" size={14} color="#fff" />
              </View>
              <View style={styles.cardBubble}>
                <Text style={styles.cardBadge}>3줄 혜택 요약</Text>
                <Text style={styles.cardTitle}>{woodyTopPolicy.name}</Text>
                <Text style={styles.cardAgency}>{woodyTopPolicy.agency}</Text>

                {woodyTopPolicy.summaryLines.map((line, i) => (
                  <Text key={i} style={styles.summaryLine}>
                    {i + 1}. {line}
                  </Text>
                ))}

                <View style={styles.cardDivider} />
                <View style={styles.cardLine}>
                  <Text style={styles.cardLabel}>지원 규모</Text>
                  <Text style={styles.cardValue}>{woodyTopPolicy.amount}</Text>
                </View>
                <View style={styles.cardLine}>
                  <Text style={styles.cardLabel}>신청 마감</Text>
                  <Text style={styles.cardValue}>{woodyTopPolicy.deadline}</Text>
                </View>

                <Pressable
                  style={styles.cardCta}
                  onPress={() => navigation.replace('WoodyResult')}
                >
                  <Text style={styles.cardCtaText}>관심 정책에 저장하기</Text>
                </Pressable>
              </View>
            </View>
          )
        )}

        {typing && (
          <View style={styles.bubbleRow}>
            <View style={styles.botAvatar}>
              <Ionicons name="document-text" size={14} color="#fff" />
            </View>
            <View style={[styles.bubble, styles.typingBubble]}>
              <Text style={styles.typingDots}>· · ·</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.kakaoBg },
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#6C4FD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  chatArea: { flex: 1 },
  chatContent: { padding: 14, paddingBottom: 30 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4B3792',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bubble: {
    backgroundColor: colors.kakaoBubbleOther,
    borderRadius: 14,
    borderTopLeftRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: '75%',
  },
  bubbleText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  typingBubble: { paddingVertical: 12 },
  typingDots: { fontSize: 16, color: colors.textSub, letterSpacing: 2 },
  cardBubble: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderTopLeftRadius: 4,
    padding: 14,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6C4FD1',
    backgroundColor: '#EFE9FF',
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: '700', fontSize: 14, color: colors.text, marginBottom: 2 },
  cardAgency: { fontSize: 11, color: colors.textSub, marginBottom: 10 },
  summaryLine: { fontSize: 12, color: colors.text, lineHeight: 18, marginBottom: 4 },
  cardDivider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  cardLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardLabel: { fontSize: 11, color: colors.textSub },
  cardValue: { fontSize: 11, fontWeight: '600', color: colors.text },
  cardCta: {
    marginTop: 8,
    backgroundColor: colors.kakaoBubbleMe,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  cardCtaText: { fontWeight: '700', fontSize: 13, color: '#3C1E1E' },
});

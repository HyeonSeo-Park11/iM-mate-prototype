import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { mockMerchant, mockProduct, mockSubsidy, mockUser } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Msg =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'card' };

const SCRIPT: Msg[] = [
  {
    id: '1',
    kind: 'text',
    text: `${mockUser.name}님, 지금 '${mockMerchant.name}' 근처시죠? ☕`,
  },
  {
    id: '2',
    kind: 'text',
    text: `최근 이 근처에서 자주 커피를 드시더라고요. 이번 달 ${mockSubsidy.subsidyName}이 아직 ${mockSubsidy.subsidyBalance.toLocaleString()}원 남아있어요!`,
  },
  {
    id: '3',
    kind: 'text',
    text: '지원금이랑 지역화폐를 활용해서, 커피값만큼 자동으로 모이는 적금은 어떠세요? 은행에서 100% 매칭해드려요 🎁',
  },
  { id: '4', kind: 'card' },
];

export default function ChatScreen({ navigation }: Props) {
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
            <Ionicons name="wallet" size={16} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>iM MATE 비서</Text>
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
                <Ionicons name="wallet" size={14} color="#fff" />
              </View>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{m.text}</Text>
              </View>
            </View>
          ) : (
            <View key={m.id} style={styles.bubbleRow}>
              <View style={styles.botAvatar}>
                <Ionicons name="wallet" size={14} color="#fff" />
              </View>
              <View style={styles.cardBubble}>
                <Text style={styles.cardTitle}>{mockProduct.productName}</Text>
                <View style={styles.cardLine}>
                  <Text style={styles.cardLabel}>월 납입</Text>
                  <Text style={styles.cardValue}>
                    {mockProduct.monthlyAmount.toLocaleString()}원
                  </Text>
                </View>
                <View style={styles.cardLine}>
                  <Text style={styles.cardLabel}>은행 매칭</Text>
                  <Text style={styles.cardValueAccent}>
                    +{mockProduct.matchedAmount.toLocaleString()}원 ({mockProduct.matchRate}%)
                  </Text>
                </View>
                <View style={styles.cardLine}>
                  <Text style={styles.cardLabel}>소수점 주식 자동매수</Text>
                  <Text style={styles.cardValue}>
                    {mockProduct.fractionalStock.ticker} {mockProduct.fractionalStock.amount.toLocaleString()}원
                  </Text>
                </View>
                <Pressable
                  style={styles.cardCta}
                  onPress={() => navigation.navigate('PrefilledForm')}
                >
                  <Text style={styles.cardCtaText}>지금 바로 시작하기</Text>
                </Pressable>
              </View>
            </View>
          )
        )}

        {typing && (
          <View style={styles.bubbleRow}>
            <View style={styles.botAvatar}>
              <Ionicons name="wallet" size={14} color="#fff" />
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
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primaryDark,
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
    maxWidth: '82%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontWeight: '700', fontSize: 14, color: colors.text, marginBottom: 10 },
  cardLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardLabel: { fontSize: 12, color: colors.textSub },
  cardValue: { fontSize: 12, fontWeight: '600', color: colors.text },
  cardValueAccent: { fontSize: 12, fontWeight: '700', color: colors.accent },
  cardCta: {
    marginTop: 8,
    backgroundColor: colors.kakaoBubbleMe,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  cardCtaText: { fontWeight: '700', fontSize: 13, color: '#3C1E1E' },
});

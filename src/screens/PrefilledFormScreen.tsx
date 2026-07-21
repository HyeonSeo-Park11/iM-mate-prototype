import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import PipelineTicker from '../components/PipelineTicker';
import { mockProduct, mockUser } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'PrefilledForm'>;

const LOAD_STEPS = [
  { id: 'address', label: '주민등록 주소지 식별', service: '마이데이터 연동 서비스' },
  { id: 'account', label: '출금 계좌 사전 매핑', service: 'iM뱅크 코어' },
  { id: 'sign', label: '사전 기입 데이터 서명 준비', service: 'API 게이트웨이' },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueRow}>
        <Text style={styles.fieldValue}>{value}</Text>
        <View style={styles.prefilledTag}>
          <Text style={styles.prefilledTagText}>자동 입력</Text>
        </View>
      </View>
    </View>
  );
}

export default function PrefilledFormScreen({ navigation }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{mockProduct.productName} 신청</Text>
        <View style={{ width: 24 }} />
      </View>

      {!loaded ? (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingTitle}>Deep-Link 사전 기입 데이터 준비 중</Text>
          <PipelineTicker steps={LOAD_STEPS} onDone={() => setLoaded(true)} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.banner}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.bannerText}>
              마이데이터 기반으로 아래 정보가 자동으로 채워졌어요. 확인만 하시면 돼요.
            </Text>
          </View>

          <Field label="이름" value={mockUser.name} />
          <Field label="주민등록번호" value={mockUser.maskedRRN} />
          <Field label="주소" value={mockUser.address} />
          <Field label="출금 계좌" value={mockUser.mainAccountNo} />
          <Field label="월 납입액" value={`${mockProduct.monthlyAmount.toLocaleString()}원`} />
          <Field
            label="은행 매칭 금액"
            value={`${mockProduct.matchedAmount.toLocaleString()}원 (${mockProduct.matchRate}%)`}
          />
          <Field
            label="소수점 주식 자동매수"
            value={`${mockProduct.fractionalStock.ticker} ${mockProduct.fractionalStock.amount.toLocaleString()}원`}
          />
          <Field label="약정 기간" value={`${mockProduct.termMonths}개월`} />

          <Pressable
            style={styles.submitBtn}
            onPress={() => navigation.navigate('BiometricAuth')}
          >
            <Ionicons name="finger-print" size={18} color="#fff" />
            <Text style={styles.submitBtnText}>생체 인증으로 서명하기</Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
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
  headerTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  loadingBox: { flex: 1, padding: 24, justifyContent: 'center' },
  loadingTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 20 },
  scroll: { padding: 20, paddingBottom: 50 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EAF7EF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  bannerText: { fontSize: 12, color: '#0E7A45', flex: 1, lineHeight: 17 },
  field: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldLabel: { fontSize: 12, color: colors.textSub, marginBottom: 6 },
  fieldValueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fieldValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  prefilledTag: {
    backgroundColor: '#EAF1FF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  prefilledTagText: { fontSize: 10, color: colors.primary, fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    gap: 8,
    marginTop: 12,
  },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
